const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

const restaurantList = require('../../restaurant.json')

// 助教建議的寫法
// 不需要for loop, 因為 MongoDB 在 Create 時，如果提供陣列會自動在內部進行 for 迴圈處理。
db.once('open', () => {
  Restaurant.create(restaurantList.results)
    .then(() => {
      db.close();  // 新增
      console.log('done')
    })
})

// 我原始的寫法，加上async/await
// db.once('open', async () => {
//   for (let i = 0; i < 8; i++) {
//     await Restaurant.create({
//       id: restaurantList.results[i].id,
//       name: restaurantList.results[i].name,
//       image: restaurantList.results[i].image,
//       category: restaurantList.results[i].category,
//       rating: restaurantList.results[i].rating,
//       location: restaurantList.results[i].location,
//       google_map: restaurantList.results[i].google_map,
//       phone: restaurantList.results[i].phone,
//       description: restaurantList.results[i].description
//     })
//   }
//   db.close()
//   console.log('seeder done!')
// })