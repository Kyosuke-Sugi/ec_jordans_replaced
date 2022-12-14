// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const loginData: { userID: string; userPW: string } = req.body;

  try {
    const checkData = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/users?email=${loginData.userID}&password=${loginData.userPW}`
    );
    console.log(checkData, "ちぇっくでーた");

    const obj = await checkData.json();

    if (obj[0] === undefined) {
      res.status(404).json({ massage: "ログイン情報が見つかりません" });
    } else {
      res.status(200).json({
        cookieId: obj[0].id,
        userName: obj[0].lastName + obj[0].firstName,
      });
    }
  } catch (error) {
    return res.status(404).json({ massage: "見つかりません" });
  }
}
