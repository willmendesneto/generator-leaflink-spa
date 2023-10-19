output "bucket_name" {
  description = "Value of the name of the created bucket"
  value       = aws_s3_bucket.this.bucket
}

output "bucket_domain_name" {
  description = "Value of the created buckets domain name"
  value       = aws_s3_bucket.this.bucket_domain_name
}

output "website_domain" {
  description = "Value of the created buckets website domain"
  value       = aws_s3_bucket_website_configuration.this.website_domain
}
