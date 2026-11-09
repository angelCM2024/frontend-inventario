import { supabase } from '../lib/supabaseClient';

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('creado_en', { ascending: false });

  if (error) throw error;
  return data;
};

export const createProduct = async (product) => {
  const { data, error } = await supabase
    .from('productos')
    .insert([product])
    .select();

  if (error) throw error;
  return data[0];
};

export const updateProduct = async (id, productData) => {
  const { data, error } = await supabase
    .from('productos')
    .update(productData)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
};

export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from('productos')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

export const checkSkuExists = async (sku, currentProductId = null) => {
  let query = supabase.from('productos').select('id').eq('sku', sku);
  
  if (currentProductId) {
    query = query.neq('id', currentProductId);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  
  return data.length > 0;
};