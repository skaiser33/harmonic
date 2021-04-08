http://localhost:3000/search/index/?isBand=false&city=Chicago&instrumentCheck=Keyboards&collaborationCheck=Tours&genreCheck=Country&genres=&influences=Bowie%2C+Beatles

<div class="container">
  
  <% if (user.messages) { %>
    <h1>YOUR MESSAGES</h1>
      <ul>
      <% user.messages.forEach(function(message) { %>
        <li><%= `${message.content}`  %></li>
      <% }) %> 
      </ul>
  <% } else {} %>  
</div>
