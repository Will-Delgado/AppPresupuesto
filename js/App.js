/* Declaramos ingresos quien va recibir los objetos de ingresos */
const ingresos  = [
    new Ingreso('Salario', 2000),
    new Ingreso('Venta Coche', 3500)
];

/* Declaramos Egreso quien va recibir los objetos de egresos */
const egresos =[
    new Egreso('Arriendo', 950),
    new Egreso('Ropa',400)
];

/* Declaramos la funcion de cargar la App */
let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}
/* Declaramos el recorrido del total de ingresos */
let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}
/* Declaramos el recorrido del total de egresos */
let totalEgresos = ()=>{
    let totalEgreso = 0;
    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}


let cargarCabecero = () =>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById("presupuesto").innerText = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerText = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerText = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerText = formatoMoneda(totalEgresos());
}

/* Funcion para dar formato Dependiendo Pais */
const formatoMoneda = (valor)=>{
   return valor.toLocaleString('es-CO',{style:'currency', currency:'COP', minimumFractionDigits:1})
}
/* Funcion para dar formato al porcentaje */
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('es-CO',{style:'percent', minimumFractionDigits:0})
}

/* Funcion Para cargar los ingresos y recorrerlos */
const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}
/* Funcion Para renderizar los ingresos */
const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <i class="fa-solid fa-delete-left"
                onclick='eliminarIngreso(${ingreso.id})' ></i>
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
}
/* Funcion Para Eliminar Ingreso */
const eliminarIngreso = (id)=>{
    /* usamos findindex para iterar el objeto y comparar el id y regresar
    el id comparado  */
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    /* con splice eliminamos el elemento indice(id)*/
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

/* Funcion Para cargar los egresos y recorrerlos */
const cargarEgresos = ()=>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <i class="fa-solid fa-delete-left"
                onclick='eliminarEgreso(${egreso.id})' ></i>
            </button>
        </div>
    </div>
</div>
    `;
    return egresoHTML;
}

/* funcion eliminar egreso */
let eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}
/* Funcion para agregar ingreso o egresos */
let agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];

    /* verificamos sin los datos son vacios y agregamos a ingresos o egreso segun su tipo */
    if(descripcion.value !== '' && valor.value !== ''){

        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(
                descripcion.value,
                +valor.value
            )
            );
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(
                descripcion.value,
                +valor.value
            ));
            cargarCabecero();
            cargarEgresos();
        }
    }
}