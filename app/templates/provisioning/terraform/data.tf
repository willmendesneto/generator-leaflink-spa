data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "<%= vueAppName %>_bucket" {
  statement {
    actions = [
      "s3:Put*",
      "s3:Get*",
      "s3:List*",
      "s3:AbortMultipartUpload"
    ]
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = [module.<%= vueAppName %>_oidc_role.role_arn]
    }
    resources = [
      "${aws_s3_bucket.this.arn}/*",
      aws_s3_bucket.this.arn
    ]
    sid = "oidcS3Access"
  }
  statement {
    actions = [
      "s3:GetObject"
    ]
    resources = [
      aws_s3_bucket.this.arn,
      "${aws_s3_bucket.this.arn}/*"
    ]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    sid = "allowRead"
  }
}

data "aws_iam_policy_document" "iam_role" {
  statement {
    actions = [
      "s3:DeleteObject*",
      "s3:PutObject*",
      "s3:GetObject*",
      "s3:ListBucket*",
    ]
    resources = [
      "${aws_s3_bucket.this.arn}/*",
      aws_s3_bucket.this.arn
    ]
    effect = "Allow"
    sid    = "OidcIAMRoleS3Access"
  }
  statement {
    actions = [
      "route53:ChangeResourceRecordSets"
    ]
    resources = [
      "arn:aws:route53:::hostedzone/Z005865730GD7RH4Z5HK"
    ]
    effect = "Allow"
    sid    = "UpdateRoute53Records"
  }
}
