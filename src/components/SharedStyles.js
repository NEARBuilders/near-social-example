// components/SharedStyles.js
import styled from 'styled-components';

export const ContentContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.medium};
`;