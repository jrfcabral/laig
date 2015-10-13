function sphere(scene, radius, stacks, slices){
    CGFobject.call(this,scene);

    this.radius = radius;
    this.stacks = stacks;
    this.slices = slices;
    this.initBuffers();
}

sphere.prototype = Object.create(CGFobject.prototype);
sphere.prototype.constructor = sphere;


sphere.prototype.initBuffers = function() { 	
    
 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

    var ang = 2*Math.PI/this.slices;
 	var ang2 = Math.PI/this.stacks;

 	for(var i = 0; i <= this.stacks; i++){
 	  for(var j = 0; j < this.slices; j++){
 	    var x = Math.cos(ang*j)*this.radius*Math.sin(ang2*i);
 	    var y = Math.sin(ang*j)*this.radius*Math.sin(ang2*i);
 	    var z = Math.cos(ang2*i)*this.radius;

 	    this.vertices.push(x, y, z);
 	    this.normals.push(x, y, z);
 	    this.texCoords.push(j/this.slices, i/this.stacks);
	 }
	 this.texCoords.push((j+1)/this.slices, i/this.stacks);
	} 
    for(var i = 0; i < this.stacks; i++){
      for(var j = 0; j < this.slices-1; j++){
        this.indices.push((i*this.slices) + this.slices+j, (i*this.slices) +j+1, (i*this.slices) +j);
        this.indices.push((i*this.slices) +j+1, (i*this.slices) +this.slices+j, (i*this.slices) +this.slices+j+1);
      }
      this.indices.push((i*this.slices) +this.slices+j, (i*this.slices) +0, (i*this.slices) +j);
      this.indices.push((i*this.slices) +this.slices+j, ((i+1)*this.slices), (i*this.slices) +0);
    }
 
	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 };