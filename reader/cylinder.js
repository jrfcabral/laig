/**
 * cylinder
 * @constructor
 */
 /*
 * I have assumed the origin of the cylinder to be the center and it will grow up (y+)
 */
 function cylinder(scene, height, br, tr, stacks, slices) { //4, 2, 0.5, 4, 8 -testCyllinder
 	CGFobject.call(this,scene);
	
	this.height = height;
	this.br = br;
	this.tr = tr;
	this.slices=slices;
	this.stacks=stacks;
	
 	this.initBuffers();
 };

 cylinder.prototype = Object.create(CGFobject.prototype);
 cylinder.prototype.constructor = cylinder;

 cylinder.prototype.initBuffers = function() {

	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	var ang = 2*Math.PI/this.slices;


 	for(var i = 0; i < this.slices; i++){
 		for(var j = 0; j < this.stacks; j++){
 			var radius = this.br + ((this.tr - this.br)/this.stacks)*j;
 			var x = radius*Math.cos(ang*i);
 			var y = radius*Math.sin(ang*i);
 			this.vertices.push(x, y, j*(this.height/this.stacks));

 			this.normals.push(x, y, 0);
 		}
 	}
 
	for(var i = 0;i < this.stacks-1;i++){
		for(var j = 0; j < this.slices-1;j++){
			this.indices.push((j+1)*this.stacks+i, j*this.stacks + (i+1), j*this.stacks+i);
			this.indices.push((j+1)*this.stacks+i, (j+1)*this.stacks+(i+1),  j*this.stacks + (i+1));
		}
		this.indices.push((this.stacks*this.slices - this.stacks)+(i+1), (this.stacks*this.slices - this.stacks)+i , i);
		this.indices.push(i, i+1, (this.stacks*this.slices - this.stacks)+(i+1));
	}


	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 };