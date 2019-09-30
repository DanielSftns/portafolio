import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
	cargando=true;
	productos:Producto[]=[];
  productosFiltrado:Producto[]=[];

  constructor(private http:HttpClient) {
  	this.cargarProductos();
  }
  
  cargarProductos(){
    return new Promise((resolve, reject)=>{
      this.http.get('https://portafolio-angular-cd074.firebaseio.com/productos_idx.json')
      .subscribe((resp:Producto[])=>{
        this.productos=resp;
        this.cargando=false;
        //console.log(resp);
        resolve();
      });
  	
  	});
  }
  
  getProducto(id:string){
    return this.http.get(`https://portafolio-angular-cd074.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto(termino:string){
    if(this.productos.length === 0){
      //cargar productos
      this.cargarProductos().then(()=>{
        //ejecutar despues de tener los productos
        //aplicar filtro
        this.filtrarProductos(termino);

      });
    }else{
      this.filtrarProductos(termino);
    }

  }
  
  filtrarProductos(termino:string){
    //vaciar arreglo para evitar duplicados en la busqueda
    this.productosFiltrado=[];
    termino=termino.toLowerCase();
    //filtrando coincidencias de letras
    this.productos.forEach(prod =>{

      const tituloLower = prod.titulo.toLowerCase();

      if(prod.categoria.indexOf(termino) >=0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrado.push(prod);
      }
    });

  }
}
