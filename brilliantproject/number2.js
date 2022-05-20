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
    //let eyeSlider; //slider
    let valueDisplayer;
    //let valueDisplayer2;

    //object 
    let objX;
    let objY;
    const radiusObj = 40;
    let objMove=false;

    //eye 
    let eyeX;
    let eyeY;     
    const radius = 50;
    let eyeMove=false;

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

        // eyeSlider = p.createSlider(0, maxRooms-1, maxRooms-2);
        // eyeSlider.parent("sketchHolderNum2");
        // eyeSlider.style('width', '800px');
        // valueDisplayer2 = p.createP()
        // valueDisplayer2.parent("sketchHolderNum2");

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
        let lightblue = p.color(101, 158, 243); 
        let lightyellow = p.color(255, 210, 110); 
        let darkred = p.color(160, 32, 15);
        let lightred = p.color(240, 119, 103);

        //setup
        p.background(lightblue);
        p.noStroke();

        //rooms
        var numRooms = slider.value();
        let refRooms = numRooms-1; 
        //let gazeNum = eyeSlider.value(); 
        valueDisplayer.html('number of room reflections '+refRooms);
        //valueDisplayer2.html('looking at reflection '+gazeNum);
        let roomWidth = (cwidth2-((numRooms+1)*mthickness))/numRooms;
        let lookNum = numRooms-1;

        //"rooms"
        for (let i = 0; i < numRooms; i += 1) 
        {
            let locscaleX = i*(roomWidth+mthickness)+mthickness;
            p.fill(255-(20*i));
            p.rect(locscaleX, 0, roomWidth, cheight2);
        }

        //line of sight
        if(lookNum%2==0)
        {
            var refLookX = (lookNum)*((roomWidth+mthickness)+mthickness)+objX;
        }
        else
        {
            var refLookX = (lookNum+1)*((roomWidth+mthickness)+mthickness)-objX;
        }
        
        var lineSlope = (eyeY-objY)/(eyeX-refLookX);
        var lineIntercept = eyeY-lineSlope*eyeX;
        
        //perception ray
        p.stroke(darkred);
        p.line(eyeX, eyeY, refLookX, objY);

        //angle arcs
        let arcRadius = 50;

        //rays per room
        for (let i = 0; i < numRooms; i += 1) 
        {
            //colors
            if (i%2==0){var c = darkred;}
            else {var c=lightyellow;}

            if (i ==0)
            {
                var xstart = xstart2 = eyeX;
                var ystart = eyeY;
            }
            else
            {
                var xstart = mthickness+(i)*(roomWidth+mthickness);
                var ystart = lineSlope*xstart+lineIntercept;
                if (i%2==0)
                {
                    var xstart2 = mthickness;
                }
                else 
                {
                    var xstart2 = (roomWidth+mthickness);
                }
            }

            if (i==numRooms-1)
            {
                var xend = refLookX;
                var yend = objY;
                var xend2 = objX;
                var multTheta = 1
            }
            else
            {
                p.fill(lightred);
                p.noStroke();

                var xend = mthickness+(i+1)*(roomWidth+mthickness);
                var yend = lineSlope*xend+lineIntercept;
                if (i%2==0)
                {
                    var xend2 = (roomWidth+mthickness);
                    var theta = p.abs(p.atan((xend2-xstart2)/(yend-ystart)));//angle of incidence and reflection
                    p.arc(xend2, yend, arcRadius, arcRadius, (3*p.PI/2-theta),(3*p.PI/2));//get angle 
                    p.arc(xend2, yend, arcRadius, arcRadius,p.PI/2, p.PI/2+theta);//get angle 
                }
                else 
                {
                    var xend2 = mthickness;
                    var theta = p.abs(p.atan((xend2-xstart2)/(yend-ystart)));//angle of incidence and reflection
                    p.arc(xend2, yend, arcRadius, arcRadius, p.PI/2-theta,p.PI/2);//get angle 
                    p.arc(xend2, yend, arcRadius, arcRadius, (3*p.PI/2),(3*p.PI/2+theta));//get angle 
                }
                
                //UNCOMMENT TO SEE ANGLE ARCS FOR LOV RAYS
                p.arc(xend, yend, arcRadius, arcRadius, p.PI/2, p.PI/2+theta);//get angle 
            }
            p.stroke(c);
            p.strokeWeight(3); 
            p.line(xstart, ystart, xend, yend);
            p.line(xstart2, ystart, xend2, yend);
        }

        //binning it all into rooms
        for (let i = 0; i < numRooms; i += 1) 
        {
            drawReflection(objX,objY, eyeX, eyeY,i, roomWidth, lookNum);
        }
    }

    function drawReflection(oX,oY, eX, eY, roomNum,roomWidth, lookRoom) 
    {
        p.push();
        let yellow = p.color(238, 167, 31);
        let green = p.color(23, 158, 126);
        let red = p.color(225, 82, 63);

        //object params
        let startX = roomNum*(roomWidth+mthickness)+mthickness;
        let oXref = roomWidth-oX;
        let lookX = lookRoom*((roomWidth+mthickness)+mthickness)+oX;

        //eye params
        let eStartX = roomNum*(roomWidth+mthickness)+mthickness;
        let eXref = roomWidth-eX;

        //similar triangles to find point of incidence (h_1*w_tot)/(h_1+h_2) = w_1 
        //let incremX = lookX/lookRoom;
        //let incremY = oY/lookRoom;
        //let incidenceY = objY+(incidenceX-objX)*(eyeY-objY)/(2*(incidenceX+mthickness)-objX-eyeX); 

        if(roomNum%2==0)
        {
            //object 
            var refX = oX+startX;
            c1=yellow;
            c2=red;
            //eye
            var eRefX = eX+eStartX;
            var angleSign = 1;
        }
        else
        {
            //object
            var refX = oXref+startX;
            c2=yellow;
            c1=red;
            //eye
            var eRefX = eXref+eStartX;
            var angleSign = -1;
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
        p.strokeWeight(3);
        p.translate(eRefX, eY);  
        p.ellipse(0,0, radius, radius);
        //pupil
        let a = p.atan2(oY-eY,(lookX-eX)*angleSign);//can make variable
        p.rotate(a);
        p.fill(green);
        p.ellipse(radius / 4, 0, radius / 2, radius / 2);
        p.pop();

    }

    p.mousePressed = function ()
    {
        let d = p.dist(p.mouseX, p.mouseY, eyeX, eyeY);
        if(d<radius)
        {
            eyeMove = true;
        }
        else
        {
            eyeMove = false;
        }

        let d2 = p.dist(p.mouseX, p.mouseY, objX, objY);
        if(d2<radiusObj && d2 != d)
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
        eyeMove = false;
        objMove = false;
    }

    p.mouseDragged=function()
    {
        if(eyeMove && p.mouseX<(cwidth2/slider.value()-radius/2) && p.mouseX>radius/2)
        {
            eyeX = p.mouseX;
            eyeY = p.mouseY;
        }

        if(objMove && p.mouseX<(cwidth2/slider.value()-radiusObj/2) && p.mouseX>radiusObj/2)
        {
            objX = p.mouseX;
            objY = p.mouseY;
        }
    }   
}

new p5(st4);
