locals {
  bucket_name = "leaflink-<%= vueAppName %>-web-${var.environment}"
  role_name   = "<%= vueAppName %>-web-s3-access-github-actions-role-${var.environment}"
}
