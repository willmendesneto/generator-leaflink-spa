variable "environment" {
  description = "Environment of the static site"
  type        = string
}

module "label" {
  source = "git@github.com:LeafLink/terraform-modules.git//leaflink/label_v2?ref=3.40.0"

  name        = "<%= vueAppName %>"
  environment = var.environment
  pod         = "kief"
}
