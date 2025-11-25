-- Add type field to articles table to distinguish between blog posts and case studies
ALTER TABLE public.articles 
ADD COLUMN type text NOT NULL DEFAULT 'blog' CHECK (type IN ('blog', 'case_study'));

-- Add fields that case studies might need
ALTER TABLE public.articles 
ADD COLUMN client text,
ADD COLUMN industry text,
ADD COLUMN metrics jsonb;

-- Create knowledge base articles table
CREATE TABLE public.kb_articles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  excerpt text,
  category text NOT NULL,
  cover_image_url text,
  published boolean NOT NULL DEFAULT false,
  author_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on kb_articles
ALTER TABLE public.kb_articles ENABLE ROW LEVEL SECURITY;

-- Published KB articles are viewable by everyone
CREATE POLICY "Published KB articles are viewable by everyone"
ON public.kb_articles
FOR SELECT
USING (published = true);

-- Admins and editors can view all KB articles
CREATE POLICY "Admins and editors can view all KB articles"
ON public.kb_articles
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- Admins and editors can create KB articles
CREATE POLICY "Admins and editors can create KB articles"
ON public.kb_articles
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- Admins and editors can update KB articles
CREATE POLICY "Admins and editors can update KB articles"
ON public.kb_articles
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- Only admins can delete KB articles
CREATE POLICY "Only admins can delete KB articles"
ON public.kb_articles
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates on kb_articles
CREATE TRIGGER update_kb_articles_updated_at
BEFORE UPDATE ON public.kb_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();