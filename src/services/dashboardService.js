import { supabase } from '../lib/supabaseClient';

export const getDashboardStats = async () => {
  // 1. Total de productos y valor del inventario (Stock * Precio Compra)
  const { data: productos, error: prodError } = await supabase
    .from('productos')
    .select('stock_actual, precio_compra');
  
  if (prodError) throw prodError;

  const totalProductos = productos.length;
  const valorInventario = productos.reduce((acc, curr) => 
    acc + (curr.stock_actual * (curr.precio_compra || 0)), 0
  );

  // 2. Últimos 5 movimientos
  const { data: movimientos, error: movError } = await supabase
    .from('movimientos')
    .select('*, productos(nombre, sku)')
    .order('creado_en', { ascending: false })
    .limit(5);

  if (movError) throw movError;

  // 3. Resumen de alertas (consultando la vista)
  const { data: alertas, error: alertError } = await supabase
    .from('vista_alertas_stock')
    .select('*')
    .limit(5);

  if (alertError) throw alertError;

  return {
    totalProductos,
    valorInventario,
    movimientosRecientes: movimientos || [],
    alertasStock: alertas || []
  };
};

export const getAlerts = async () => {
  const { data, error } = await supabase
    .from('vista_alertas_stock')
    .select('*')
    .order('stock_actual', { ascending: true });
  
  if (error) throw error;
  return data || [];
};