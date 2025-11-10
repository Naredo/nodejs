# Laboratorio: CRUD con NestJS y Dependency Injection

## Objetivo
Crear una API REST básica con NestJS implementando inyección de dependencias y operaciones CRUD.

## Duración estimada
45 minutos

---

## 1. Preparación del entorno

Instala NestJS CLI globalmente:

```bash
npm install -g @nestjs/cli
```

Crea un nuevo proyecto:

```bash
nest new productos-api
cd productos-api
```

---

## 2. Generar módulo, controlador y servicio

```bash
nest generate module productos
nest generate controller productos
nest generate service productos
```

---

## 3. Definir el modelo de datos

Crea `src/productos/producto.interface.ts`:

```typescript
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}
```

---

## 4. Implementar el servicio (con Dependency Injection)

Edita `src/productos/productos.service.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { Producto } from './producto.interface';

@Injectable()
export class ProductosService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Laptop', precio: 800, stock: 10 },
    { id: 2, nombre: 'Mouse', precio: 20, stock: 50 },
  ];

  findAll(): Producto[] {
    return this.productos;
  }

  findOne(id: number): Producto {
    return this.productos.find(p => p.id === id);
  }

  create(producto: Omit<Producto, 'id'>): Producto {
    const nuevoProducto = {
      id: this.productos.length + 1,
      ...producto,
    };
    this.productos.push(nuevoProducto);
    return nuevoProducto;
  }

  update(id: number, producto: Partial<Producto>): Producto {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos[index] = { ...this.productos[index], ...producto };
      return this.productos[index];
    }
    return null;
  }

  delete(id: number): boolean {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos.splice(index, 1);
      return true;
    }
    return false;
  }
}
```

---

## 5. Implementar el controlador CRUD

Edita `src/productos/productos.controller.ts`:

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from './producto.interface';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  obtenerTodos(): Producto[] {
    return this.productosService.findAll();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string): Producto {
    return this.productosService.findOne(+id);
  }

  @Post()
  crear(@Body() producto: Omit<Producto, 'id'>): Producto {
    return this.productosService.create(producto);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() producto: Partial<Producto>): Producto {
    return this.productosService.update(+id, producto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string): { deleted: boolean } {
    return { deleted: this.productosService.delete(+id) };
  }
}
```

---

## 6. Probar la aplicación

Inicia el servidor:

```bash
npm run start:dev
```

Prueba los endpoints:

```bash
# GET todos los productos
curl http://localhost:3000/productos

# GET un producto
curl http://localhost:3000/productos/1

# POST crear producto
curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Teclado","precio":45,"stock":30}'

# PUT actualizar producto
curl -X PUT http://localhost:3000/productos/1 \
  -H "Content-Type: application/json" \
  -d '{"precio":750}'

# DELETE eliminar producto
curl -X DELETE http://localhost:3000/productos/2
```

---

## Conceptos clave

- **@Injectable()**: Marca una clase como proveedor que puede ser inyectado
- **Constructor injection**: NestJS inyecta automáticamente el servicio en el controlador
- **Decoradores HTTP**: @Get(), @Post(), @Put(), @Delete()
- **Separación de responsabilidades**: Controlador maneja HTTP, servicio maneja lógica de negocio

---

## Referencias

- [NestJS Documentation](https://docs.nestjs.com/)
- [Dependency Injection in NestJS](https://docs.nestjs.com/providers)
- [Controllers in NestJS](https://docs.nestjs.com/controllers)
- [REST API Best Practices](https://restfulapi.net/)
