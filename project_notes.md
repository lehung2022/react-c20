1 - This project does not have a back-end team to create the datas, so I created the db by using json file.
2 - To run the server for the datas, use: 
npx json-server -p 3500 -w data/products.json
3 - Run the server first, then run the local port. Otherwise, it will return "no posts to display" message on the screen.
4 - When you delete the post in the server, it will disappear. When you create the new posts, it will also appear in the server side.