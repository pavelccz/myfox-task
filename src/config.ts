export const GRAPHQL_ENDPOINT = 'https://cmyp37vc53jlbv5wa3nrnez6mi0dktla.lambda-url.eu-central-1.on.aws/';

// Secrets would normally be stored in environment variables, but for the test assignment we keep them here.
export const API_KEY = 'da2-gcyvktbwpfhnznbpdaghdbyf7m';

export const CUSTOMER_ID = 'cm0b8kilabkyu0783rc2uuzax';

export const photoRestUrl = (secret: string) => `https://api.myfox.cz/test/photo/${secret}`;

export const microSiteFormUrl = (subjectAlias: string) => `https://${subjectAlias}.snippet-test.myfox.cz/form/show`;
