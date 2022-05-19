//Number 2

//NUMBER 2
var st4 = function( p ) 
{
    //canvas setup
    const cwidth2 = 900;
    const cheight2 = 600;
    const maxRooms = 6;
    const mthickness = 3;
    let slider; //slider
    let eyeSlider; //slider
    let valueDisplayer;
    let valueDisplayer2;

    //object 
    let objX;
    let objY;
    const radiusObj = 40;
    //let objMove=false;

    //eye 
    let eyeX;
    let eyeY;     
    const radius = 50;
    //let eyeMove=false;

    p.setup = function() 
    {
        //canvas
        var canvas = p.createCanvas(cwidth2, cheight2);
        canvas.parent("sketchHolderNum2");

        //slider
        slider = p.createSlider(2, maxRooms, maxRooms-2);
        slider.parent("sketchHolderNum2");
        slider.style('width', '800px');
        valueDisplayer = p.createP()
        valueDisplayer.parent("sketchHolderNum2");

        eyeSlider = p.createSlider(0, maxRooms-1, maxRooms-2);
        eyeSlider.parent("sketchHolderNum2");
        eyeSlider.style('width', '800px');
        valueDisplayer2 = p.createP()
        valueDisplayer2.parent("sketchHolderNum2");

        //obj start
        objX = (cwidth2/(maxRooms-2))/2;
        objY = 100;

        // eye start
        eyeX = (cwidth2/(maxRooms-2))/2;
        eyeY = cheight2-100;
    }
      
    p.draw = function() 
    {
        //colors
        let lightyellow = p.color(255, 210, 110); 
        let lightblue = p.color(101, 158, 243); 
        let yellow = p.color(238, 167, 31);
        let green = p.color(23, 158, 126);
        let red = p.color(225, 82, 63);
        //let darkred = color(160, 32, 15);
        let darkblue = p.color(11,65,157);

        //setup
        p.background(lightblue);
        p.noStroke();

        //rooms
        let numRooms = slider.value();
        let refRooms = numRooms-1; 
        let gazeNum = eyeSlider.value(); 
        valueDisplayer.html('number of room reflections '+refRooms);
        valueDisplayer2.html('looking at reflection '+gazeNum);
        let roomWidth = (cwidth2-((numRooms+1)*mthickness))/numRooms;

        // //object 
        // //top border
        // ellipse(objX, objY, 1.1*radiusObj, 1.1*radiusObj, PI/2, 1.5*PI);
        // //red half 
        // fill(red);
        // arc(objX, objY, radiusObj, radiusObj, PI/2, 1.5*PI);   
        // //yellow half
        // fill(yellow);
        // arc(objX, objY, radiusObj, radiusObj, 1.5*PI, PI/2);

        //binning it all into rooms
        for (let i = 0; i < numRooms; i += 1) 
        {
            let locscaleX = i*(roomWidth+mthickness)+mthickness;
            p.fill(255-(20*i));
            p.rect(locscaleX, 0, roomWidth, cheight2);
            drawReflection(objX,objY, eyeX, eyeY,i, roomWidth, red, yellow, green);
        }

    }

    function drawReflection(oX,oY, eX, eY, roomNum,roomWidth, red, yellow, green) 
    {
        //push();

        //object params
        let startX = roomNum*(roomWidth+mthickness)+mthickness;
        let oXref = roomWidth-oX;

        //eye params
        let eStartX = roomNum*(roomWidth+mthickness)+mthickness;
        let eXref = roomWidth-eX;

        if(roomNum%2==0)
        {
            //object 
            var refX = oX+startX;
            c1=yellow;
            c2=red;
            //eye
            var eRefX = eX+eStartX;
        }
        else
        {
            //object
            var refX = oXref+startX;
            c2=yellow;
            c1=red;
            //eye
            var eRefX = eXref+eStartX;
        }
        //object
        p.noStroke()
        p.fill(c2);
        p.arc(refX, oY, radiusObj, radiusObj, p.PI/2, 1.5*p.PI);
        p.fill(c1);
        p.arc(refX, oY, radiusObj, radiusObj, 1.5*p.PI, p.PI/2);

        //eye
        p.fill(255);
        p.stroke(green);
        p.ellipse(eRefX, eY, radius, radius);
        //pupil
        p.fill(green);
        p.ellipse(eRefX+radius / 4, eY, radius / 2, radius / 2);
        //let a = p.atan2(oY-eY,refX-eXref);//can make variable
        //pop();
    }

    p.mousePressed = function ()
    {
        let d = p.dist(p.mouseX, p.mouseY, eyeX, eyeY);
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

new p5(st4);
