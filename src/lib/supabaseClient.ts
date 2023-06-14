import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ycmxgafipthgdgshvnzz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljbXhnYWZpcHRoZ2Rnc2h2bnp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2NzI2NjIsImV4cCI6MjAwMjI0ODY2Mn0.IH2aO6va8E-OEveyO2J3WwucIZXMc3b4nBN0D_Y8KG4"
);
