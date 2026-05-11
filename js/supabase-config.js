// Supabase Configuration
// TODO: Wklej nowe klucze Supabase poniżej
const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';

// Initialize Supabase client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export to window for global access
window.supabaseClient = supabaseClient;

// Check if user is logged in
async function getCurrentUser() {
    const { data: { user }, error } = await supabaseClient.auth.getUser();
    return user;
}

// Check if user is admin
async function isAdmin() {
    const user = await getCurrentUser();
    if (!user) return false;
    
    // Check user role from database
    const { data, error } = await supabaseClient
        .from('customers')
        .select('role')
        .eq('user_id', user.id)
        .single();
    
    return data?.role === 'admin';
}

window.getCurrentUser = getCurrentUser;
window.isAdmin = isAdmin;