export function userCard({name, location, email, phone, picture, timezone, id}) {
    return `<li class="user user_table"  id="${id}">
    <img src="${picture}" alt="user_avatar" class="avatar">
    <h4 class="name text_middle">${name}</h4>
    <p class="adress text_middle">${location}</p>
    <a href="mailto:${email}" class="email text_middle">${email}</a>
    <p class="phone text_middle">${phone}</p>
    <p class="zone text_middle">${timezone}</p>
    <button class="actions remove">Remove</button>
  </li>
   `;
}