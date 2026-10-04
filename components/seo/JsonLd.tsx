/**
 * Datos estructurados (JSON-LD) para buscadores e IA. Se escapa `<` para que un
 * string del contenido no pueda cerrar el <script> (recomendación de Next).
 * Validar en search.google.com/test/rich-results.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
