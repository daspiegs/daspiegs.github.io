//NUMBER 1

var st3 = function( p ) 
{

    //draggable eye setup
    let shapeX;
    let shapeY;
    let shapeMove=false;

    const radius = 40;
    const diameter = 2*radius;

    //draggable object setup
    let objX;
    let objY;
    const radiusObj = 40;
    const diameterObj = 2*radius;
    let objMove=false;

    //canvas parameters
    const cwidth = 900;
    const cheight = 600;
    const mborder = cheight/2; //mirror border

    p.setup=function() 
    {
        let canvas = p.createCanvas(cwidth, cheight);
        canvas.parent("sketchHolderNum1");

        // eye drag
        shapeX = 600;
        shapeY = 200;

        //obj drag
        objX = 100;
        objY = 100;
    }

    p.draw = function() 
    {
        p.background(255);
        //colors
        let lightyellow = p.color(255, 210, 110); 
        let lightblue = p.color(101, 158, 243); 
        let yellow = p.color(238, 167, 31);
        let green = p.color(23, 158, 126);
        let red = p.color(225, 82, 63);
        //let darkred = color(160, 32, 15);
        let darkblue = p.color(11,65,157);

        //mirror
        p.noStroke();
        p.fill(230);
        p.rect(0, cheight-mborder, cwidth, mborder);
        p.fill(lightblue);
        p.rect(0, cheight-mborder, cwidth, mborder/20);

        //similar triangles to find point of incidence (h1*x)/(h1+h2) = x1 from objx
        let incidenceX = objX+(mborder-objY)*(shapeX-objX)/(2*mborder-objY-shapeY) 

        //rays
        p.stroke(darkblue);
        p.strokeWeight(radiusObj/6);
        p.line(objX, 2*mborder-objY, incidenceX, mborder)//incidence to mirror object
        p.stroke(lightyellow);
        p.strokeWeight(radiusObj/6); //
        p.line(shapeX, shapeY, incidenceX, mborder)//eye to mirror
        p.line(incidenceX, mborder, objX,objY)//object to incidence

        //eyeball + reflection 
        p.stroke(lightblue);
        drawEye(shapeX, shapeY, diameter, green, mborder,incidenceX);   
        p.noStroke();   
        drawEye(shapeX, (2*mborder-shapeY), diameter, green, mborder,incidenceX); 

        //object + reflection
        //top border
        p.ellipse(objX, objY, 1.1*radiusObj, 1.1*radiusObj);
        //red halves     
        p.fill(red);
        p.arc(objX, objY, radiusObj, radiusObj, p.PI/2, 1.5*p.PI);
        p.arc(objX, 2*mborder-objY, radiusObj, radiusObj, p.PI/2, 1.5*p.PI);
        //yellow halves  
        p.fill(yellow);
        p.arc(objX, objY, radiusObj, radiusObj, 1.5*p.PI, p.PI/2);
        p.arc(objX, 2*mborder-objY, radiusObj, radiusObj, 1.5*p.PI, p.PI/2);

        //angle arcs
        let arcRad = 100;
        let theta = p.abs(p.atan((mborder-objY)/(objX-incidenceX)));//angle of incidence and reflection
        p.fill(yellow);
        //stroke(red);
        p.strokeWeight(3);
        p.arc(incidenceX, mborder, arcRad, arcRad,-theta,0);//get angle 
        p.arc(incidenceX, mborder, arcRad, arcRad, p.PI, p.PI+theta);

        //noFill();//illustrate same angle to percieved obj location
    // stroke(darkred);
        //arc(incidenceX, mborder, arcRad, arcRad, PI+theta, PI);

    }

    p.mousePressed = function ()
    {
        let d = p.dist(p.mouseX, p.mouseY, shapeX, shapeY);
        if(d<radius)
        {
            shapeMove = true;
        }
        else
        {
            shapeMove = false;
        }

        let d2 = p.dist(p.mouseX, p.mouseY, objX, objY);
        if(d2<radiusObj)
        {
            objMove = true;
        }
        else
        {
            objMove = false;
        }
    }

    p.mouseRealeased = function()
    {
        shapeMove = false;
        objMove = false;
    }

    p.mouseDragged=function()
    {
        if(shapeMove && p.mouseY<(mborder-radius))
        {
            shapeX = p.mouseX;
            shapeY = p.mouseY;
        }

        if(objMove && mouseY<(mborder-radiusObj))
        {
            objX = p.mouseX;
            objY = p.mouseY;
        }
    }   

    function drawEye(tx, ty, ts, tc, yFollow, xFollow) 
    {
        p.push();

        //eyewhites
        p.fill(255);
        //stroke(101, 158, 243);
        p.strokeWeight(3);
        p.translate(tx, ty);  
        p.ellipse(0, 0, ts, ts);

        let a = p.atan2(yFollow-ty, xFollow-tx);
        p.rotate(a);

        //pupil
        p.fill(tc);
        p.ellipse(ts / 4, 0, ts / 2, ts / 2);
        p.pop();
    }
}

new p5(st3);
