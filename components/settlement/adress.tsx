import React from "react";
import useSWR from "swr";
import { useCookie } from "../useCookie";

export default function Address() {
  const userId = useCookie();

  // 発送先を表示すため、ユーザー情報を取得するフェッチ
  const fetcher = (resource: string) =>
    fetch(resource).then((res) => res.json());

  const { data: user, error } = useSWR(`/api/users/${userId}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!user) return <div>loading...</div>;

  return (
    <div>
      <h1>購入手続き</h1>
      <h3>お届け先情報</h3>
      <p>
        氏名: {user?.lastName} {user?.firstName}
      </p>
      <p>郵便番号: {user?.zipCode}</p>
      <p>都道府県: {user?.prefecture}</p>
      <p>市区町村: {user?.city}</p>
      <p>番地: {user?.address}</p>
      <p>建物名: {user?.building}</p>
      <p>メールアドレス: {user?.email}</p>
      <p>電話番号: {user?.phoneNumber}</p>
      <br />
    </div>
  );
}
