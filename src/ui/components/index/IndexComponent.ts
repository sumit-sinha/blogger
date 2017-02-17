import { Component } from "@angular/core";

@Component({
	selector: "blog",
	template: `
	    <navigation-bar></navigation-bar>

	    <!-- Page Content -->
	    <div class="container">

	        <div class="row">

	            <!-- Blog Post Content Column -->
	            <div class="col-lg-8">

	                <!-- Blog Post -->

	                <!-- Title -->
	                <h1>Blog Post Title</h1>

	                <!-- Author -->
	                <p class="lead">
	                    by <a href="#">Start Bootstrap</a>
	                </p>

	                <hr>

	                <!-- Date/Time -->
	                <p><span class="glyphicon glyphicon-time"></span> Posted on August 24, 2013 at 9:00 PM</p>

	                <hr>

	                <!-- Preview Image -->
	                <img class="img-responsive" src="http://placehold.it/900x300" alt="">

	                <hr>

	                <!-- Post Content -->
	                <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?</p>
	                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.</p>
	                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, doloribus, dolorem iusto blanditiis unde eius illum consequuntur neque dicta incidunt ullam ea hic porro optio ratione repellat perspiciatis. Enim, iure!</p>
	                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nostrum, aliquid, animi, ut quas placeat totam sunt tempora commodi nihil ullam alias modi dicta saepe minima ab quo voluptatem obcaecati?</p>
	                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, dolor quis. Sunt, ut, explicabo, aliquam tenetur ratione tempore quidem voluptates cupiditate voluptas illo saepe quaerat numquam recusandae? Qui, necessitatibus, est!</p>

	                <hr>

	                <comment-box></comment-box>

	            </div>

	            <!-- Blog Sidebar Widgets Column -->
	            <div class="col-md-4">

	                <!-- Blog Search Well -->
	                <div class="well">
	                    <h4>Blog Search</h4>
	                    <div class="input-group">
	                        <input type="text" class="form-control">
	                        <span class="input-group-btn">
	                            <button class="btn btn-default" type="button">
	                                <span class="glyphicon glyphicon-search"></span>
	                        </button>
	                        </span>
	                    </div>
	                    <!-- /.input-group -->
	                </div>

	                <!-- Blog Categories Well -->
	                <div class="well">
	                    <h4>Blog Categories</h4>
	                    <div class="row">
	                        <div class="col-lg-6">
	                            <ul class="list-unstyled">
	                                <li><a href="#">Category Name</a>
	                                </li>
	                                <li><a href="#">Category Name</a>
	                                </li>
	                                <li><a href="#">Category Name</a>
	                                </li>
	                                <li><a href="#">Category Name</a>
	                                </li>
	                            </ul>
	                        </div>
	                        <div class="col-lg-6">
	                            <ul class="list-unstyled">
	                                <li><a href="#">Category Name</a>
	                                </li>
	                                <li><a href="#">Category Name</a>
	                                </li>
	                                <li><a href="#">Category Name</a>
	                                </li>
	                                <li><a href="#">Category Name</a>
	                                </li>
	                            </ul>
	                        </div>
	                    </div>
	                    <!-- /.row -->
	                </div>

	                <!-- Side Widget Well -->
	                <div class="well">
	                    <h4>Side Widget Well</h4>
	                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, perspiciatis adipisci accusamus laudantium odit aliquam repellat tempore quos aspernatur vero.</p>
	                </div>

	            </div>

	        </div>
	        <!-- /.row -->

	        <hr>

	        <!-- Footer -->
	        <footer>
	            <div class="row">
	                <div class="col-lg-12">
	                    <p>Copyright &copy; Your Website 2014</p>
	                </div>
	            </div>
	            <!-- /.row -->
	        </footer>

	    </div>
	    <!-- /.container -->
	`
})

export class IndexComponent {}