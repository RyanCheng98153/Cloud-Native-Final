import express from "express";
import cors from "cors"
import mysqlPool from "../../utils/mysql";
import { error } from "node:console";

const router = express.Router();
router.use(cors());
router.use(express.json());


router.get("/", (req, res) => {
  res.status(200).send("split router is availble");
});

router.post("/", async (req, res) => {
  try {
    const mysql = await mysqlPool.getConnection();
    const q = `select * from feat_accounting where super_cid = 'C001';`
    const [rows] = await mysql.query(q);
    console.log(rows)
    const records = rows.map((record) => ({
      text: record.description, // 將 description 作為 text
      amount: `$${parseFloat(record.amount).toLocaleString()}` // 格式化金額並轉換為字串
    }));
    console.log(rows)
    res.status(200).send(records);
  }
  catch(error) {
    console.error("Split:Error", error);
  }
  // const records = [
  //   {  text: "香蕉", amount: "-$5,000,000,000" },
  //   {  text: "陶朱隱園", amount: "-$5,000,000,000" },
  //   // 可以添加更多記錄
  // ];

})

router.post("/add", async(req, res) => {
  try {
    const mysql = await mysqlPool.getConnection();
    const value = 'C001';
    const q = `select * from feat_accounting, channel,\`groups\` where super_cid = cid and cid = 'C001';
`
    const [rows] = await mysql.query(q, value);
    console.log(rows);
    res.status(200).send(rows);
  }
  catch (error) {
    console.error("Split/add:Error", error);
  }
})


router.post("/addBill", async(req, res) => {
  try {
    const mysql = await mysqlPool.getConnection();
    
    // 查詢最後一筆記錄
    const [rows] = await mysql.query("SELECT accid FROM feat_accounting ORDER BY id DESC LIMIT 1");
    let lastId = rows.length > 0 ? rows[0].id : "Ac000"; // 若無資料，預設從 Ac000 開始

    // 生成新 ID
    const numericPart = parseInt(lastId.substring(2), 10) + 1; // 提取數字部分並加 1
    const newId = `AC${numericPart.toString().padStart(3, "0")}`; // 格式化為 AcXXX 

    const q = `
      INSERT INTO your_table_name (
          accid, 
          super_cid, 
          payer, 
          amount, 
          unit, 
          attendees_ids, 
          description, 
          event_time, 
          is_split, 
          created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
    const values = [
      newId,                          // accid (假設由程式生成)
      "C001",                           // super_cid (假設為固定值)
      req.payers[0],                   // payer (取付款人的第一個)
      parseFloat(data.amount),          // amount (轉為數字)
      "NTD",                            // unit (假設為固定值)
      data.splitters.join(","),         // attendees_ids (分攤人轉為逗號分隔字串)
      req.title || null,         // description
      new Date(data.date),              // event_time (轉為 Date 物件)
      0, // is_split (根據分攤人數量決定)
      "U001"                            // created_by (假設為固定值)
    ];
    
    const [rows2, fields] = await mysql.query(q, values);
  } catch (error) {
    console.error("Add bill:", error);
  }
})

export default router;