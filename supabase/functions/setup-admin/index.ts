import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { secret } = await req.json();
    if (secret !== 'setup-jamiela-admin-2026') {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const adminEmail = 'admin@jamiela.com';
    const adminPassword = 'Jamellah@2026Natural';

    // Check if admin already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const adminExists = existingUsers?.users?.find((u: any) => u.email === adminEmail);

    let userId: string;

    if (adminExists) {
      userId = adminExists.id;
      // Update password
      await supabase.auth.admin.updateUserById(userId, { password: adminPassword });
    } else {
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
      });

      if (createError) throw createError;
      userId = newUser.user.id;
    }

    // Assign admin role
    const { error: roleError } = await supabase.from('user_roles').upsert({
      user_id: userId,
      role: 'admin',
    }, { onConflict: 'user_id,role' });

    if (roleError) throw roleError;

    return new Response(JSON.stringify({ success: true, message: 'Admin account ready. Login: admin@jamiela.com' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
