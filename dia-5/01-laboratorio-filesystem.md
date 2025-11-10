# Laboratorio: API FileSystem en Node.js

## Objetivo
Practicar las operaciones básicas del sistema de archivos en Node.js utilizando el módulo `fs` y conceptos relacionados.

---

## Ejercicio 1: Crear y leer archivos

### Versión síncrona:

```javascript
import { writeFileSync, readFileSync } from 'fs';

// Escribir archivo
writeFileSync('datos.txt', 'Hola desde Node.js');

// Leer archivo
const contenido = readFileSync('datos.txt', 'utf-8');
console.log(contenido);
```

### Versión asíncrona con async/await:

```javascript
import { writeFile, readFile } from 'fs/promises';

async function gestionarArchivo() {
    try {
        // Escribir archivo
        await writeFile('datos.txt', 'Hola desde Node.js');
        
        // Leer archivo
        const contenido = await readFile('datos.txt', 'utf-8');
        console.log(contenido);
    } catch (error) {
        console.error('Error:', error);
    }
}

gestionarArchivo();
```

---

## Ejercicio 2: FileStats

### Versión síncrona:

```javascript
import { statSync } from 'fs';

const stats = statSync('datos.txt');

console.log('Tamaño:', stats.size, 'bytes');
console.log('¿Es archivo?', stats.isFile());
console.log('¿Es directorio?', stats.isDirectory());
console.log('Última modificación:', stats.mtime);
```

### Versión asíncrona con async/await:

```javascript
import { stat } from 'fs/promises';

async function obtenerStats() {
    try {
        const stats = await stat('datos.txt');
        
        console.log('Tamaño:', stats.size, 'bytes');
        console.log('¿Es archivo?', stats.isFile());
        console.log('¿Es directorio?', stats.isDirectory());
        console.log('Última modificación:', stats.mtime);
    } catch (error) {
        console.error('Error:', error);
    }
}

obtenerStats();
```

---

## Ejercicio 3: Path

Trabaja con rutas de archivos:

```javascript
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rutaCompleta = path.join(__dirname, 'carpeta', 'archivo.txt');
console.log('Ruta completa:', rutaCompleta);
console.log('Extensión:', path.extname(rutaCompleta));
console.log('Nombre base:', path.basename(rutaCompleta));
console.log('Directorio:', path.dirname(rutaCompleta));
```

---

## Ejercicio 4: Buffers

Manipula datos binarios:

```javascript
// Crear buffer desde string
const buf1 = Buffer.from('Hola');
console.log(buf1); // <Buffer 48 6f 6c 61>

// Crear buffer vacío
const buf2 = Buffer.alloc(10);
buf2.write('Node.js');
console.log(buf2.toString());
```

---

## Ejercicio 5: Streams

Lee un archivo grande usando streams:

```javascript
import { createReadStream, createWriteStream } from 'fs';

const readStream = createReadStream('datos.txt', 'utf-8');

readStream.on('data', (chunk) => {
    console.log('Chunk recibido:', chunk);
});

readStream.on('end', () => {
    console.log('Lectura completada');
});

readStream.on('error', (error) => {
    console.error('Error:', error);
});
```

Copia un archivo usando streams:

```javascript
import { createReadStream, createWriteStream } from 'fs';

const readStream = createReadStream('datos.txt');
const writeStream = createWriteStream('copia.txt');

readStream.pipe(writeStream);

writeStream.on('finish', () => {
    console.log('Archivo copiado correctamente');
});
```

---

## Ejercicio 6: Operaciones con directorios

### Crear y listar directorios:

```javascript
import { mkdir, readdir, rmdir } from 'fs/promises';

async function gestionarDirectorios() {
    try {
        // Crear directorio
        await mkdir('mi-carpeta', { recursive: true });
        console.log('Directorio creado');
        
        // Listar contenido
        const archivos = await readdir('.');
        console.log('Archivos en directorio actual:', archivos);
        
        // Eliminar directorio vacío
        await rmdir('mi-carpeta');
        console.log('Directorio eliminado');
    } catch (error) {
        console.error('Error:', error);
    }
}

gestionarDirectorios();
```

---

## Referencias

- [Node.js File System Documentation](https://nodejs.org/api/fs.html)
- [Node.js Path Module](https://nodejs.org/api/path.html)
- [Node.js Buffer Documentation](https://nodejs.org/api/buffer.html)
- [Node.js Stream Documentation](https://nodejs.org/api/stream.html)
