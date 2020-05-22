export const config = {
  'username': process.env.AWS_PGUSERNAME,
  'password': process.env.AWS_PGPASSWORD,
  'database': process.env.AWS_PGDATABASE,
  'host': process.env.AWS_PGHOST,
  'dialect': 'postgres',
  'aws_region': process.env.AWS_REGION,
  'aws_profile': process.env.AWS_PROFILE,
  'aws_media_bucket': process.env.AWS_MEDIA_BUCKET,
  'url': process.env.URL,
  'jwt': {
    'secret': process.env.JWT_SECRET,
  },
};
