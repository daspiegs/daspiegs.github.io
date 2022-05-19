//NUMBER 1
var s1 = function( sketch1 ) 
{
    sketch1.setup = function() 
    {
        var canvas1 = sketch1.createCanvas(900, 600);
        canvas1.parent("sketchHolder");
    }

    sketch1.draw = function() 
    {
        if (sketch1.mouseIsPressed) 
        {
            sketch1.fill(0);
        } 
        else 
        {
            sketch1.fill(255);
        }

        sketch1.ellipse(sketch1.mouseX, sketch1.mouseY, 80, 80);
    }
}
new p5(s1);



//NUMBER 2
// var s2 = function( sketch2 ) 
// {
//     var x = 250;//sets x
//     var angle = 90;//sets angle
//     var sliderTrans;// first slider
//     var sliderRot;// second slider

//     sketch2.setup = function() 
//     {
//         var canvas2 = sketch2.createCanvas(900, 600);
//         canvas2.parent("sketchHolder2");//change div if necessary 
//         sketch2.angleMode(sketch2.DEGREES)
//         sliderTrans = sketch2.createSlider(100, 400,250,50);
//         sliderTrans.parent("sketchHolder2")
//         sliderRot = sketch2.createSlider(0, 360,0);
//         sliderRot.parent("sketchHolder2")
//     }

//     sketch2.draw = function() 
//     {
//         sketch2.background("white");
//         //sketch2.fill("red");// fills color red
//         sketch2.stroke("red");//makes line red
//         //sketch2.noFill();// no fill
//         sketch2.strokeWeight(10);// weight of line

//         sketch2.push()
//         //sliders
//         x = sliderTrans.value(); //sets slider x
//         angle = sliderRot.value(); //sets slider rot
//         sketch2.translate(x,220)
//         sketch2.rotate(angle)
//         sketch2.line(- 3, -100,- 3 , 100)
//         sketch2.pop()
//     }
// }
// new p5(s2);
