resource "null_resource" "remote_exec_from_github" {
  connection {
    host        = "${var.host}"
    type        = "ssh"
    user        = "ubuntu"
    private_key = "${file("/Users/ravikumar/aws/id_rsa")}"
  }

  // copy our example script to the server
  provisioner "file" {
    source      = "/Users/ravikumar/Documents/Fall2020/DevOps/Assignments/ChoreApp/infrastructure/resources/config.sh"
    destination = "/tmp/config.sh"
  }

  // change permissions to executable and pipe its output into a new file
  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/config.sh",
      "/tmp/config.sh",
    ]
  }
}
