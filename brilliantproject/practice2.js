//NUMBER 1
var st = function( sketch ) 
{
    sketch.setup = function() 
    {
        var canvas = sketch.createCanvas(900, 600);
        canvas.parent("sketchHolderTest");
    }
      
      // draw an arrow for a vector at a given base position

    sketch.draw = function() 
    {
        sketch.background(255);

        //mirror
        let c = sketch.color(44, 111, 239);
        sketch.fill(c);
        sketch.noStroke();
        sketch.rect(0, 500, 900, 55);

        //incident
        let v0 = sketch.createVector(0, 0);
        let v1 = sketch.createVector(sketch.mouseX, 500);
        let vref = sketch.createVector(1, 0, 0);
        let vref2 = sketch.createVector(-1, 0, 0);
        c = sketch.color(225, 82, 63);
        drawArrow(v0, v1, c, 3, 1.5);
      
        //normal
        let n = sketch.createVector(0, -30);

        //reflected ray
        let r = v1.copy();
        r.reflect(n);
        c = sketch.color(225, 82, 63);
        drawArrow(v1, r, c, 3, 1.5);

        //angle arcs
        c = sketch.color(240, 119, 103);
        sketch.fill(c);
        sketch.noStroke();
        sketch.arc(v1.x, v1.y, 80, 80, vref.angleBetween(r),vref.angleBetween(vref))
        sketch.arc(v1.x, v1.y, 80, 80, vref2.angleBetween(vref), vref2.angleBetween(v1))

        //LASER
        c = sketch.color(238, 167, 31);
        drawArrow(v0, v1.normalize().mult(50), c, 20,15);

        //eye
        drawEye(690, 200, 80, r, v1); 
    }

    function drawArrow(base, vec, myColor, w, arrowSize) 
    {
        sketch.push();
        sketch.stroke(myColor);
        sketch.strokeWeight(w);
        sketch.fill(myColor);
        sketch.translate(base.x, base.y);
        sketch.line(0, 0, vec.x, vec.y);
        sketch.pop();
    }

    function drawEye(tx, ty, ts, ref, vec) 
    {
        sketch.push();

        //eyewhites
        sketch.fill(255);
        sketch.stroke(101, 158, 243);
        sketch.strokeWeight(3);
        sketch.translate(tx, ty);  
        sketch.ellipse(0, 0, ts, ts);

        //angle 
        let a = sketch.atan2(ty-vec.y, sketch.mouseX-tx);
        sketch.rotate(a);

        //is ray hitting?
        let rmag = ref.sub(vec).mag();
        let eyedist = vec.sub(tx,ty).mag();

        var rToEye = (1-(eyedist/rmag))*(ref.sub(tx,ty)).mag()//vector subtraction take the magnitude
        if (rToEye > -30 && rToEye < 10) 
        {
            sketch.fill(240, 119, 103);
            //let shift = vector.copy().normalize().setMag(overlap);
        } 
        else 
        {
            sketch.fill(23, 158, 126);
        }  

        //pupil
        sketch.ellipse(ts / 4, 0, ts / 2, ts / 2);

        sketch.pop();
    }

}

new p5(st);


//NUMBER 2
var st2 = function( sketch ) 
{
    //canvas width
    var cwidth = 900;
    var cheight = 600;
    var mthickness = 50;
    let slider; //slider

    sketch.setup = function() 
    {
        //canvas
        var canvas = sketch.createCanvas(cwidth, cheight);
        canvas.parent("sketchHolderTest2");

        //slider
        slider = sketch.createSlider(1, cwidth, 50);
        slider.parent("sketchHolderTest2");
        slider.style('width', '900px');
    }
      
    sketch.draw = function() 
    {
        sketch.background(255);
        sketch.stroke(225, 82, 63);
        sketch.strokeWeight(4);

        let val = slider.value();
        for (let xx = 0; xx <= cwidth; xx += val) 
        {
            if (xx/val % 2 == 0) 
            {
                sketch.line(xx, mthickness, xx+val, cheight-mthickness);
            } 
            else 
            {
                sketch.line(xx, cheight-mthickness, xx+val, mthickness);
            }
        }

        //mirrors
        let c = sketch.color(44, 111, 239);
        sketch.fill(c);
        sketch.noStroke();
        sketch.rect(0, cheight-mthickness, cwidth, mthickness);
        sketch.rect(0, 0, cwidth, mthickness);   
    }

}

new p5(st2);