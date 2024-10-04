import type {NextApiRequest, NextApiResponse} from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  console.log("Some request!");
}
