-- Create table to track CV downloads
CREATE TABLE public.cv_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cv_downloads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit download request
CREATE POLICY "Anyone can submit CV download request"
ON public.cv_downloads
FOR INSERT
WITH CHECK (true);

-- Only admins can view download records
CREATE POLICY "Admins can view CV downloads"
ON public.cv_downloads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));