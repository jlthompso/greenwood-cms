import { Typography, Box } from './material';
import convertMarkdownToJSX from '../models/markdown';

export default function Post(props) {
  return (
    <Box>
      <Typography variant='h3'>{props.post.title}</Typography>
      {convertMarkdownToJSX(props.post.body)}
    </Box>
  );
}