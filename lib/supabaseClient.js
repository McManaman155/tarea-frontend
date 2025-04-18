import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mxokiupjqinjrxehvycv.supabase.co/';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14b2tpdXBqcWluanJ4ZWh2eWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5Njc3NjcsImV4cCI6MjA2MDU0Mzc2N30.uFmXoC_183Xab3OSRM0dXDbQs90Dtt1ZDIenk1nAp2E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

