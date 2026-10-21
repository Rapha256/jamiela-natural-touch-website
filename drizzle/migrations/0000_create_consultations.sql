CREATE TABLE public.consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_method TEXT NOT NULL,
  contact_info TEXT NOT NULL,
  goals TEXT[] NOT NULL DEFAULT '{}',
  concerns TEXT[] NOT NULL DEFAULT '{}',
  hair_type TEXT,
  hair_thickness TEXT,
  wash_frequency TEXT,
  protective_styles TEXT,
  dryness_frequency TEXT,
  current_products TEXT[] NOT NULL DEFAULT '{}',
  current_routine_notes TEXT,
  desired_routine TEXT,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.consultations TO authenticated;
GRANT ALL ON public.consultations TO service_role;

ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit consultations"
ON public.consultations FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Admins can view consultations"
ON public.consultations FOR SELECT
TO public
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update consultations"
ON public.consultations FOR UPDATE
TO public
USING (has_role(auth.uid(), 'admin'::app_role));