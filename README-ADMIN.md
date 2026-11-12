# Panel de administración — notas técnicas

Misma arquitectura que Alianza Runners: Sveltia CMS (`/admin`) guarda JSON en
GitHub (`datos/*.json`); `js/datos.js` los lee al cargar (raw.githubusercontent,
5 min de caché; fotos por jsDelivr) y repinta los bloques `[data-bloque]`.

- `js/renderers.js` — generadores de HTML compartidos (navegador y Node).
- `node build.js` — regenera esos bloques dentro de `index.html` (SEO y sin
  parpadeo). Correrlo después de editar `datos/*.json` en local y antes de
  sincronizar al servidor.
- `admin/config.yml` — campos del panel. Repo: `fandresramirez/buenos-habitos`
  (debe ser público: raw.githubusercontent y jsDelivr no sirven repos privados).
- Fotos subidas desde el panel van a `img/fotos/` y se sirven por jsDelivr.
- Token de acceso: fine-grained personal access token con permiso
  *Contents: Read and write* solo sobre ese repositorio.
- No va al repositorio: `backend/.env`, `Perros/`, `nuevasImagenes/`, `recursos/`.
