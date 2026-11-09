import { supabase } from '../lib/supabaseClient';

export const getMovements = async () => {
  const { data, error } = await supabase
    .from('movimientos')
    .select(`
      *,
      productos (nombre, sku)
    `)
    .order('creado_en', { ascending: false });

  if (error) throw error;
  return data;
};

export const createMovement = async (movementData) => {
  const { data, error } = await supabase
    .from('movimientos')
    .insert([movementData])
    .select();

  if (error) {
    // Capturar el error del Constraint check_stock_positivo
    if (error.message.includes('check_stock_positivo')) {
      throw new Error('Stock insuficiente para realizar esta salida.');
    }
    throw error;
  }
  
  return data[0];
};