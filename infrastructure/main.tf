provider "aws" {
 region = "us-east-1"
}

resource aws_key_pair "chore_key" {
    key_name = "id_rsa" 
    public_key = "${file("${var.path_to_public_key}")}"
}

resource "aws_instance" "chore_cloud_server" {
    ami = "ami-0885b1f6bd170450c"
    instance_type = "t2.micro" 
    key_name = "${aws_key_pair.chore_key.key_name}"
    vpc_security_group_ids = ["${aws_security_group.chore_security.id}"]
}

resource "aws_security_group" "chore_security" {
    name = "chore_security"
    ingress {
        protocol = "tcp"
        from_port = 80
        to_port = 80
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        protocol = "tcp"
        from_port = 22
        to_port = 22
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port = 0
        to_port = 0 
        protocol = "-1" 
        cidr_blocks = ["0.0.0.0/0"]
    }
}

module "chore_project" {
    source = "./provision"
    host = "${aws_instance.chore_cloud_server.public_dns}" 
    path_to_private_key = "${var.path_to_private_key}"
    project_link_or_path = "foo"
    image_version = "bar" 
    use_github = "yep" 
    use_local = "nope" 
    public_ip = "${aws_instance.chore_cloud_server.public_dns}"
}