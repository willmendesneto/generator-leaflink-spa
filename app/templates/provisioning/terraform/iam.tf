module "<%= vueAppNameSnakeCase %>_web_oidc_role" {
  source = "git@github.com:LeafLink/terraform-modules.git//aws/github-oidc-role?ref=3.40.0"

  oidc_provider_arn = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:oidc-provider/token.actions.githubusercontent.com"
  role_name         = local.role_name
}

resource "aws_iam_policy" "this" {
  name   = "${local.role_name}-policy"
  policy = data.aws_iam_policy_document.iam_role.json
}

resource "aws_iam_role_policy_attachment" "this" {
  role       = module.<%= vueAppNameSnakeCase %>_web_oidc_role.role_name
  policy_arn = aws_iam_policy.this.arn
}
