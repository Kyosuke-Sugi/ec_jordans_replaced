import { useState } from "react";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import React from "react";
import Image from "next/image";

const PurchaseForm = (props:any) => {
  //inputに登録された画像のバイナリデータを保持するstate
  //型名、要検討
  const [imagePreview, setImagePreview] = useState<any>(undefined);

  //inputに登録された画像のバイナリデータをstateに保持する関数
  const onChangeFileInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    //imagePreviewの値をundefinedに初期化
    setImagePreview(undefined);

    // 何も選択されなかったら処理中断
    if (event.target.files?.length === 0) {
      return;
    }

    // ファイル画像でなかったら処理中断
    if (!event.target.files?.[0].type.match("image.*")) {
      return;
    }

    // FileReaderクラスのインスタンスを取得
    const reader = new FileReader();

    // ファイルを読み込み終わったタイミングで実行するイベントハンドラー
    reader.onload = (e) => {
      // imagePreviewに読み込み結果（データURL/バイナリデータ）を代入する
      // imagePreviewに値を入れると<output>に画像が表示される
      console.log(e.target?.result);
      setImagePreview(e.target?.result);
    };

    // ファイル読み込み読み込まれたファイルはデータURL形式で受け取れる（上記onload参照）
    console.log(reader.readAsDataURL(event.target?.files[0]));
  };

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const onSubmit = async () => {
    router.push(`/purchase?confirm=1`);
  };

  const citySuggest = async () => {
    const values = getValues();
    const res = await fetch(
      `https://api.zipaddress.net/?zipcode=${values.postcode}`,
      {
        mode: "cors",
      }
    );
    const result = await res.json();
    setValue("prefecture", result.data.pref);
    setValue("city", result.data.address);
  };

  console.log(getValues().itemPhoto);

  return (
    <>
      <h1>当店の買取システムはこちら！</h1>
      <p>新品、中古、新作、旧作スニーカーを高価買取！1足から何足でもOK！</p>
      <p>直接店舗に持ち込んでその場で現金！全国から発送買取も受付中です！</p>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <h1>
          <span>買取受付フォーム</span>
        </h1>
        <h2>
          <span>お客様情報を入力してください。</span>
        </h2>
        <hr />
        <div>
          <label htmlFor="lastName">
            <span className="label-fit label-danger">必須</span>氏名
          </label>

          <input
            id="lastName"
            placeholder="山田"
            {...register("lastname", {
              required: "必須項目です。",
            })}
          />

          <input
            id="firstName"
            placeholder="太郎"
            {...register("firstname", {
              required: "必須項目です。",
            })}
          />

          {(errors.firstname?.message && (
            <span className="formError">
              {errors.firstname?.message as string}
            </span>
          )) ||
            (errors.lastname?.message && (
              <span className="formError">
                {errors.lastname?.message as string}
              </span>
            ))}
        </div>
        <div>
          <label htmlFor="kanaLastName">
            <span className="label-fit label-danger">必須</span>氏名（カナ）
          </label>

          <input
            id="kanaLastName"
            placeholder="ヤマダ"
            {...register("kanalastname", {
              required: "必須項目です。",
            })}
          />
          <input
            id="kanaFirstName"
            placeholder="タロウ"
            {...register("kanafirstname", {
              required: "必須項目です。",
            })}
          />

          {(errors.kanalastname?.message && (
            <span className="formError">
              {errors.kanalastname?.message as string}
            </span>
          )) ||
            (errors.kanafirstname?.message && (
              <span className="formError">
                {errors.kanalastname?.message as string}
              </span>
            ))}
        </div>
        <div>
          <div>
            <label htmlFor="phoneNumber">
              <span className="label-fit label-danger">必須</span>電話番号
            </label>

            <input
              id="phone"
              placeholder="0312345678"
              {...register("phone", {
                required: "必須項目です。",
                pattern: {
                  value: /^0\d{9,10}$/,
                  message: "電話番号を正しく入力してください",
                },
              })}
            />
            {errors.phone?.message && (
              <span className="formError">
                {errors.phone?.message as string}
              </span>
            )}
          </div>
          <div>
            <span className="notice">*ハイフンなしで入力してください。</span>
          </div>
        </div>
        <div>
          <label htmlFor="email">
            <span className="label-fit label-danger">必須</span>メールアドレス
          </label>

          <input
            id="email"
            placeholder="sample@sample.co.jp"
            {...register("email", {
              required: "必須項目です。",
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                message: "メールアドレスを正しく入力してください",
              },
            })}
          />

          {errors.email?.message && (
            <span className="formError">{errors.email.message as string}</span>
          )}
        </div>
        <div>
          <label htmlFor="postCode">
            <span className="label-fit label-danger">必須</span>郵便番号
          </label>
          <input
            type="text"
            placeholder="1600022"
            {...register("postcode", {
              required: "必須項目です。",
              pattern: {
                value: /^\d{3}?\d{4}$/,
                message: "郵便番号を正しく入力してください。",
              },
            })}
          ></input>
          <input
            type="button"
            className="btn"
            onClick={citySuggest}
            value="住所を自動入力"
          />

          {errors.postcode?.message && (
            <span className="formError">
              {errors.postcode.message as string}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="prefecture">
            <span className="label-fit label-danger">必須</span>都道府県
          </label>
          <input
            type="text"
            placeholder="東京都"
            id="prefecture"
            {...register("prefecture", { required: "必須項目です。" })}
          />
          {errors.prefecture?.message && (
            <span className="formError">
              {errors.prefecture.message as string}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="city">
            <span className="label-fit label-danger">必須</span>市区町村
          </label>
          <input
            type="text"
            placeholder="新宿区新宿"
            id="city"
            {...register("city", { required: "必須項目です。" })}
          ></input>
          {errors.city?.message && (
            <span className="formError">{errors.city.message as string}</span>
          )}
        </div>
        <div>
          <label htmlFor="address">
            <span className="label-fit label-danger">必須</span>番地
          </label>
          <input
            type="text"
            placeholder="4-3-25"
            id="address"
            {...register("address", { required: "必須項目です。" })}
          />
          {errors.address?.message && (
            <span className="formError">
              {errors.address.message as string}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="building">
            <span className="label-fit label-warning">任意</span>建物名
          </label>
          <input
            type="text"
            placeholder="TOKYU REIT新宿ビル8F"
            id="building"
            {...register("building")}
          />
        </div>
        <h2>
          <span>買取希望商品情報を入力してください。</span>
        </h2>
        <hr />
        <div className="used-item-formA">
          <h3>買取希望商品１</h3>
          <div>
            <label htmlFor="itemName">
              <span className="label-fit label-danger">必須</span>品名
            </label>
            <input
              type="text"
              placeholder="NIKE AIR JORDAN 1"
              id="itemName"
              {...register("itemName", { required: "必須項目です。" })}
            />
            {errors.itemName?.message && (
              <span className="formError">
                {errors.itemName.message as string}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="itemCode">
              <span className="label-fit label-danger">必須</span>品番
            </label>
            <input
              type="text"
              placeholder="555088-101"
              id="itemCode"
              {...register("itemCode", { required: "必須項目です。" })}
            />
            {errors.itemCode?.message && (
              <span className="formError">
                {errors.itemCode.message as string}
              </span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="itemSize">
            <span className="label-fit label-danger">必須</span>サイズ（cm）
          </label>
          <input
            type="text"
            placeholder="28cm"
            id="itemSize"
            {...register("itemSize", { required: "必須項目です。" })}
          />
          {errors.itemSize?.message && (
            <span className="formError">
              {errors.itemSize.message as string}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="itemColor">
            <span className="label-fit label-danger">必須</span>カラー
          </label>
          <input
            type="text"
            placeholder="白"
            id="itemColor"
            {...register("itemColor", { required: "必須項目です。" })}
          />
          {errors.itemColor?.message && (
            <span className="formError">
              {errors.itemColor.message as string}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="itemPhoto">
            <span className="label-fit label-danger">必須</span>写真
          </label>
          <input
            //画像ファイルだけでバリデーションする
            accept="image/*"
            type="file"
            id="itemPhoto"
            {...register("itemPhoto", { required: "必須項目です。" })}
            onChange={onChangeFileInput}
          />
          {errors.itemPhoto?.message && (
            <span className="formError">
              {errors.itemPhoto.message as string}
            </span>
          )}
          <div>
            {!!imagePreview && (
              <output className="preview">
                {/* stateのバイナリデータを参照する */}
                <Image
                  src={imagePreview}
                  alt="画像プレビュー"
                  height={150}
                  width={150}
                />
              </output>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="itemNote">
            <span className="label-fit label-warning">任意</span>備考
          </label>
          <input
            type="text"
            placeholder="箱無し、傷あり"
            id="itemNote"
            {...register("itemNote")}
          />
        </div>
        {/* <div className="used-item-form">
          <h3>買取希望商品２</h3>
          <div>
            <label htmlFor="itemNameB">
              <span className="label-fit label-danger">必須</span>品名
            </label>
            <input
              type="text"
              placeholder="NIKE AIR JORDAN 1"
              id="itemName"
              {...register("itemName")}
            />
          </div>
          <div>
            <label htmlFor="itemCode">
              <span className="label-fit label-danger">必須</span>品番
            </label>
            <input
              type="text"
              placeholder="555088-101"
              id="itemCode"
              {...register("itemCode")}
            />
          </div>
          <div>
            <label htmlFor="itemSize">
              <span className="label-fit label-danger">必須</span>サイズ
            </label>
            <input
              type="text"
              placeholder="28cm"
              id="itemSize"
              {...register("itemSize")}
            />
          </div>
          <div>
            <label htmlFor="itemColor">
              <span className="label-fit label-danger">必須</span>カラー
            </label>
            <input
              type="text"
              placeholder="白"
              id="itemColor"
              {...register("itemColor")}
            />
          </div>
          <div>
            <label htmlFor="itemPhoto">
              <span className="label-fit label-danger">必須</span>写真
            </label>
            <input type="file" id="itemPhoto" {...register("itemPhoto")} />
          </div>
          <div>
            <label htmlFor="itemNote">
              <span className="label-fit label-warning">任意</span>備考
            </label>
            <input
              type="text"
              placeholder="箱無し、傷あり"
              id="itemNote"
              {...register("itemNote")}
            />
          </div>
        </div> */}

        <div>
          <p>
            さらに買取希望の方は下記の備考欄に入力をお願い致します。
            <br /> 下記をコピーしてお使いください。
            <br />
            ----------------------------
            <br /> 品名:
            <br /> 品番:
            <br /> サイズ:
            <br /> カラーetc:
            <br /> 備考:
          </p>
          <div>
            <label htmlFor="note">
              <span className="label-fit label-warning">任意</span>備考
            </label>
            <br />
            <textarea
              cols={80}
              rows={5}
              id="note"
              placeholder="買取情報を入力してください"
              {...register("itemAdd")}
            />
          </div>
        </div>
        <button type="submit">入力内容を確認</button>
      </form>
    </>
  );
};

export default PurchaseForm;
