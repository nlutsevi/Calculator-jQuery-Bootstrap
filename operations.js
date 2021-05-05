$(document).ready(function() {
    //inicializamos las variables
    var eq = "";
    var curNumber="";
    var result = "";
    var entry = "";
    var reset = false;
  
    //recogemos el valor del botón seleccionado y lo guardamos en entry
    $("button").click(function() {    
      entry = $(this).attr("value");   

      if (entry === "ac") { //all clear - borrar todo
        entry=0;
        eq=0;
        result=0;
        curNumber=0;
        //printeamos el resultado y el previo en la calculadora
        $('#result p').html(entry);
        $('#previous p').html(eq);  
      }
      else if (entry === "ce") { //borrardo la entrada más reciente
        if (eq.length > 1) {
          eq = eq.slice(0, -1);        
          $('#previous p').html(eq);
        }
        else {
          eq = 0;  
          $('#result p').html(0);
          $('#previous p').html(eq);
        }
        if (curNumber.length > 1) {
          curNumber = curNumber.slice(0, -1);        
          $('#result p').html(curNumber);  
        }
        else {
          curNumber = 0;  
          $('#result p').html(0);
        }
        
      }
      else if (entry === "=") {
        result = eval(eq); //evalua el string de la ecuación introducida en eq y hace el cálculo aritmético
        $('#result p').html(result); 
        eq += " = " +result;
        $('#previous p').html(eq);
        eq = result;
        entry = result;
        curNumber = result;
        reset = true;
      }
      
      else if (isNaN(entry)) {
        if (entry !== ".") {     
          reset = false;       
          if (curNumber === 0 || eq === 0) { 
            curNumber = 0;
            eq = entry;         
          }
          else {
            curNumber = "";
            eq += entry;
          }     
          $('#previous p').html(eq); 
        }
        else if (curNumber.toString().indexOf(".") === -1) { 
          reset = false;
          if (curNumber === 0 || eq === 0) { 
            curNumber = 0.;
            eq = 0.;           
          }
          else {
            curNumber += entry;
            eq += entry;        
          }
          $('#result p').html(curNumber);
          $('#previous p').html(eq);        
        }      
      }
      else {  
        if (reset) {
          eq = entry;
          curNumber = entry;       
          reset = false;
        }
        else {
          eq += entry; 
          curNumber += entry;        
          }
         $('#previous p').html(eq); 
         $('#result p').html(curNumber);
        }   
      
      //control de longitud de digitos introducidos
      if (curNumber.length > 10 || eq.length > 26) {
        $("#result p").html("0");
        $("#previous p").html("Too many digits");
        curNumber ="";
        eq="";
        result ="";
        reset=true;
      }
    });
});