import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
	producto:ProductoDescripcion;
	ID:string;

  constructor(private route:ActivatedRoute, public ProductoService:ProductosService) { }

  ngOnInit() {
  	this.route.params.subscribe(parametros =>{
  		// subscribe para estar pendiente de los cambios en parametros de la url
  		//console.log(parametros['id']);
  		// ver todos los cambios, explicitamente el ID del producto 
  		this.ProductoService.getProducto(parametros['id'])
  		.subscribe((producto:ProductoDescripcion) =>{
  			this.ID=parametros['id'];
  			this.producto=producto;
  			//console.log(producto);
  		});
  	});
  }

}
