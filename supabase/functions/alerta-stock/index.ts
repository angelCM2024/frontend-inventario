import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    // Capturamos el evento que envía la base de datos
    const payload = await req.json()
    const producto = payload.record
    const productoAnterior = payload.old_record

    // Solo enviamos el correo si el stock acaba de cruzar el límite hacia abajo.
    // Esto evita que te lleguen correos repetidos si un producto ya estaba por debajo del mínimo y se hace otra venta.
    const yaEstabaBajo = productoAnterior && productoAnterior.stock_actual < producto.stock_minimo;
    
    if (yaEstabaBajo || producto.stock_actual >= producto.stock_minimo) {
      return new Response(
        JSON.stringify({ message: "No requiere alerta de correo." }), 
        { headers: { "Content-Type": "application/json" } }
      )
    }

    // Configuración del correo con Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Alertas Inventario <onboarding@resend.dev>',
        to: 'edwardjosue012@gmail.com', // Cambia esto por tu correo real
        subject: `⚠️ Alerta de Stock: ${producto.nombre}`,
        html: `
          <h2>Nivel de inventario crítico</h2>
          <p>El producto <strong>${producto.nombre}</strong> (SKU: ${producto.sku}) requiere atención.</p>
          <ul>
            <li><strong>Stock actual:</strong> <span style="color: red;">${producto.stock_actual}</span></li>
            <li><strong>Mínimo permitido:</strong> ${producto.stock_minimo}</li>
          </ul>
          <p>Por favor, gestiona el reabastecimiento en el sistema.</p>
        `
      })
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})