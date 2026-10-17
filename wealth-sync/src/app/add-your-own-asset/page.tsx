import AddYourOwnAssetPage from "@/components/AddOwnAssetComponents/AddOwnAssetPage";
import React from "react";
import { getOwnAssets } from "@/server/actions/assets";

async function AddYourOwnAsset() {
  const assets = await getOwnAssets();

  return <AddYourOwnAssetPage assets={assets} />;
}

export default AddYourOwnAsset;
