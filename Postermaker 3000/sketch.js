
//GOOEY
 let guiBox
 //

	

	//variables for canvas
	var w
	var h
	var cnv
	var myPicker2
	//
	
	//variables for background
	var r
	var g 
	var b  
	
	let checkbox;
	var gPicker1
	var gPicker2
	//
		//image
let img, imgX, imgY, imgW, imgH, dropdown2,dropdown3,dropdown4,dropdown5, tintSel
	//
	//variables for text
let myPicker
let fontSelect
let fontStyle
let texts = [], textSel = 0, dropdown, button, size
let draggable = false
	//
	
	//var text anim
let	checkbox1
let sizeA1
let checkbox2, lead1, lead2
let strokeW,strokeS, checkbox3

	//

	//grid
let gridC, gridR, checkG
	//



	//save cnv
let	saveIm, saveVid
	//
 
 

function setup() {

	buildGUI()
	createCanvas(wSlider.value(), hSlider.value()).drop(handleFile)
	
	//createCanvas(1080, windowHeight).drop(handleFile);
    texts.push(new Enter())
    
       
  button.mousePressed(addT)
  
      
  
    fontSelect.option('Sans-serif');
  fontSelect.option('Serif');
  fontSelect.option('Cursive');
  fontSelect.option('Monospace');
  fontSelect.option('Fantasy');
  fontSelect.option('Verdana');
  fontSelect.option('Helvetica');
  fontStyle.option('normal')
  fontStyle.option('italic')
  fontStyle.option('bold')
  fontStyle.option('bold italic')
   fontSelect.changed(fontChanged);
   fontStyle.changed(fontStyleChange)
 
    
   saveIm.mousePressed(saveDrawing)
   saveVid.mousePressed(saveVideo)
   
  

   
   
}
 
 
  function addT(){
    	texts.push(new Enter(this.x, this.y ))
    	dropdown.value(texts.length-1)
    	textSel = texts.length-1
    	
    }
 
 
function updateText(){
    texts[textSel].text = txtInput.value()
    
}


 
function draw() {
    clear()
     background(myPicker2.value())
	 
	

    
    //gradient
    
    push()
	if (checkbox.checked()) {
    for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(gPicker1.value(),gPicker2.value(),n);
    stroke(newc);
    line(0,y,width, y);
  }
  } 
	pop()
	//
  push()


	//IMAGE
	if(img != null){
      image(img, imgX.value(), imgY.value() , imgW.value(), imgH.value());
	   if(dropdown2.checked()){
	filter(THRESHOLD)}
	if(dropdown3.checked()){
	filter(INVERT)
  }
  if(dropdown4.checked()){
	filter(POSTERIZE)
  }
  if(dropdown5.checked()){
	filter(BLUR, 20)
  }

    }
	
  	//
	pop()

	
	// TEXT
	
    let counter = 0
    for(let t of texts){
    	t.selected = false
    	if(counter == textSel){
    		t.selected = true
    	}



        t.display()
        counter++
    } 

	
    if(mouseIsPressed){
        
        
        if(draggable){
        	
        	let t = texts[textSel]
        	t.x = mouseX
        	t.y = mouseY
        }
        
    }
    //
    //grids
	push()
	if(checkG.checked()){
	for (var x = 0; x < width; x += width / gridC.value()) {
		for (var y = 0; y < height; y += height / gridR.value()) {
			stroke(0);
			strokeWeight(1);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
	}
}else{
	strokeWeight(0)
}
pop()
//
   

  

}



function mousePressed(){
	if (mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0){
	let t = texts[textSel]
        if(dist(t.x, t.y, mouseX, mouseY) < t.width ){
			draggable = true
		}
	}
}

function mouseReleased(){
	draggable = false
}
function handleFile(file) {
  // Remove the current image, if any.
  if (img) {
    img.remove();
  }

  // Create an <img> element with the
  // dropped file.
   img = createImg(file.data, '');
   
  img.hide();

  

}
function saveDrawing() {
  save("Picture.png");
}

function saveVideo(){
	   saveGif('Picture', 5);
}

function fontChanged() {
  
  fontSelection = fontSelect.value();
  textFont(fontSelection);
}

 function fontStyleChange(){
 	 styleSelection = fontStyle.value();
 	textStyle(styleSelection);
 }

 
 
class Enter{
    constructor(){
        // add .x .y position 
       this.x = width/2
       this.y = height/2
        this.text = txtInput.value()
        dropdown.option(texts.length)
        this.textSize = slider.value()
        this.width = 0
        this.selected = false
        this.textLeading = 20
        this.fill = myPicker.value()
		this.textFont = fontSelect.value()
    }
    
    display(){
    	fill(this.fill)
    	
    	 if (checkbox2.checked()) {
			
    textLeading(this.textLeading * sin(frameCount * lead2.value())+lead1.value());
  } else {
   textLeading(this.textLeading)
  }
        
        textAlign(CENTER, CENTER)
        if (checkbox1.checked()) {
    textSize(this.textSize * sin(frameCount * 0.05) + sizeA1.value())
  } else {
    textSize(this.textSize)
  }
       
  if (checkbox3.checked()) {
    stroke(myPicker.value())
	strokeWeight(strokeS.value()*sin(frameCount * strokeW.value())+strokeS.value())
  } else {
   noStroke()
  }
        this.width = textWidth(this.text)
        text(this.text, this.x, this.y)
        
        
    
        
    }
    
   
    
}


   









function buildGUI() {
	guiBox = createDiv('')
		.position(width / 2, 15)
		.class('gui')
		
	guiBar = createDiv('OPTIONS').class('guibar').parent(guiBox).draggable(guiBox).doubleClicked(()=>{guiContent.toggleClass('hidden')})

	guiContent = createDiv('').class('guicontent').parent(guiBox)
	
	
	//slider for canvas
	guiCan = createDiv('CANVAS').class('guiCan').parent(guiContent)
	
	createDiv('Width').class('label').parent(guiCan)
	wSlider = createSlider(0, windowWidth, 1080, 5)
		.parent(guiCan)
	createDiv('Height').class('label').parent(guiCan)
	hSlider = createSlider(0, windowHeight, windowHeight, 5)
		.parent(guiCan)
	//
	
	
	//sliders for background
	guiBack = createDiv('BACKGROUND').class('guiBack').parent(guiContent)
	
	
	createDiv('Canvas Color').class('label').parent(guiBack)
	myPicker2 = createColorPicker('red')
	.parent(guiBack)
	
	createDiv('Gradient').class('label').parent(guiBack)
	checkbox = createCheckbox(' add gradient')
	.parent(guiBack)
		
	createDiv('Gradient Color 1').class('label').parent(guiBack)
	gPicker1 = createColorPicker('red')
	.parent(guiBack)
	createDiv('Gradient Color 2').class('label').parent(guiBack)
	gPicker2 = createColorPicker('blue')
	.parent(guiBack)
	//
		
	//sliders for TEXT
	guiText = createDiv('Text').class('guiText').parent(guiContent)
	
	createDiv('').class('label').parent(guiText)
	 txtInput = createElement('textarea').value('hello world').input(updateText)
    	.parent(guiText)
    createDiv('').class('label').parent(guiText)	
    	button = createButton('new text')
    	.parent(guiText)
     createDiv('').class('label').parent(guiText)	
    dropdown = createSelect().changed(()=>{
        textSel = dropdown.value()
        txtInput.value(texts[textSel].text)
        print(textSel)
        
     
    })
    .parent(guiText)
	createDiv('Text Size').class('label').parent(guiText)
	slider = createSlider(12, 600, 24)
		.parent(guiText).input(()=> {
			texts[textSel].textSize = slider.value()
		})
	createDiv('leading').class('label').parent(guiText)
	slider2 = createSlider(0, 900, 10)
	.parent(guiText).input(()=> {
			texts[textSel].textLeading = slider2.value()
		})	
	
	createDiv('Text Color').class('label').parent(guiText)
	myPicker = createColorPicker('')
	.parent(guiText).input(()=> {
		
			texts[textSel].fill = myPicker.value()
		})	
	createDiv('Text font').class('label').parent(guiText)
	fontSelect = createSelect()
	.parent(guiText)
	createDiv('Text font style').class('label').parent(guiText)
	fontStyle = createSelect()
	.parent(guiText)
	//
	//ANim
	guiAnim = createDiv('Animation').class('guiAnim').parent(guiContent)
	
	createDiv('Size').class('label').parent(guiAnim)
		checkbox1 = createCheckbox('')
	.parent(guiAnim)
	createDiv('').class('label').parent(guiAnim)
	sizeA1 = createSlider(0, 300, 50)
	.parent(guiAnim)
	createDiv('Leading').class('label').parent(guiAnim)
	checkbox2 = createCheckbox('')
	.parent(guiAnim)
	createDiv('').class('label').parent(guiAnim)
	lead1 = createSlider(0, 300, 10)
	.parent(guiAnim)
	createDiv('').class('label').parent(guiAnim)
	  lead2 = createSlider(0, 1, 0.05, 0.01)
	  .parent(guiAnim)
	  createDiv('Stroke').class('label').parent(guiAnim)
	checkbox3 = createCheckbox('')
	.parent(guiAnim)
	createDiv('').class('label').parent(guiAnim)  
	  strokeS = createSlider(0, 300, 0.5)
	  .parent(guiAnim)
	createDiv('').class('label').parent(guiAnim)
	strokeW = createSlider(0, 0.5, 0.05, 0.01)
	.parent(guiAnim)
	//
	//IMG	
	guiImg = createDiv('Drop Image').class('guiImg').parent(guiContent)
	createDiv('Image X').class('label').parent(guiImg)
	imgX = createSlider(-windowWidth, windowWidth, 0, 1)	
	.parent(guiImg)
	createDiv('Image Y').class('label').parent(guiImg)
	imgY = createSlider(-windowHeight, windowHeight, 0, 1)	
	.parent(guiImg)
	createDiv('Image Width').class('label').parent(guiImg)
	imgW = createSlider(0, windowWidth, 0, 1)	
	.parent(guiImg)
	createDiv('Image Height').class('label').parent(guiImg)
	imgH = createSlider(0, windowHeight, 0, 1)	
	.parent(guiImg)
	createDiv('Threshold').class('label').parent(guiImg)
	dropdown2 = createCheckbox()	
	.parent(guiImg)
	createDiv('Invert').class('label').parent(guiImg)
	dropdown3 = createCheckbox()	
	.parent(guiImg)
	createDiv('Posterize').class('label').parent(guiImg)
	dropdown4 = createCheckbox()	
	.parent(guiImg)
	createDiv('Blur').class('label').parent(guiImg)
	dropdown5 = createCheckbox()	
	.parent(guiImg)
	
	//
	//grid
	guiGrid = createDiv('Grid').class('guiGrid').parent(guiContent)
	createDiv('').class('label').parent(guiGrid)
	checkG = createCheckbox()
	.parent(guiGrid)
	createDiv('Column').class('label').parent(guiGrid)
	gridC = createSlider(0, 100, 10, 1)
	.parent(guiGrid)
	createDiv('Row').class('label').parent(guiGrid)
	gridR = createSlider(0, 100, 5, 1)
	.parent(guiGrid)
	
	
	
	//save	
	guiSave = createDiv('Save').class('guiSave').parent(guiContent)	

	createDiv('').class('guiSave').parent(guiSave)		
	saveIm = createButton('Save Image')
		.parent(guiSave)	
		
	createDiv('').class('guiSave').parent(guiSave)		
	saveVid = createButton('Save Video')
		.parent(guiSave)	
		
	//	
	guiLink = createDiv('').class('guiLink').parent(guiContent)
	a = createA('about.html','about' )
	.parent(guiLink)
	
}
