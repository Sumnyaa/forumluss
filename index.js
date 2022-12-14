const {
  Client,
  Collection,
  Intents
} = require('discord.js');

const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});

const Discord = require('discord.js');


require('dotenv').config()

module.exports = client;


client.discord = Discord;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require('./config.json')


require("./handler")(client);
const db = require('quick.db')

client.login(client.config.botToken);

//kayit sistemi
const discordModals = require('discord-modals') 
discordModals(client); 


const { Modal, TextInputComponent, showModal } = require('discord-modals') // Now we extract the showModal method
const { MessageActionRow, MessageButton } = require('discord.js');

client.on('modalSubmit', (modal) => {
  if(modal.customId === 'modal-customid'){
    const firstResponse = modal.getTextInputValue('textinput-customid')
    const yas = modal.getTextInputValue('textinput-customid2')
    const insanmi = modal.getTextInputValue('robotd')
    const nerdengeldin = modal.getTextInputValue('nerden')
    

 const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('kabulet')
            .setLabel('Kabul et')
            .setEmoji('915989741944569896')
            .setStyle('PRIMARY'),
            new MessageButton()
            .setCustomId('reddet')
            .setLabel('Reddet')
            .setEmoji('915989741688729650')
            .setStyle('SECONDARY'),
    );



if(insanmi != '4') return modal.reply({content: `Robot Doğrulamasını Geçemedininiz!`}).catch(err => console.log(`Semoizm`)) && setTimeout(async() => {
modal.channel.delete().catch(err => console.log(`Semoizm`))
}, 3 * 1000)

if(!nerdengeldin) {
let adam2 = modal.reply({content: `${modal.member} tarafından bir kayıt isteği: \n\n İsim;` + `\`\`\`${firstResponse}\`\`\`` + 'Yaş;' + `\`\`\`${yas}\`\`\``+ 'Burayı Nerden Buldun?;' + `\`\`\`Belirtilmemiş!\`\`\``, components: [row] }).catch(err => console.log(`Semoizm`)) 

} else {
let adam2 = modal.reply({content: `${modal.member} tarafından bir kayıt isteği: \n\n İsim;` + `\`\`\`${firstResponse}\`\`\`` + 'Yaş;' + `\`\`\`${yas}\`\`\``+ 'Burayı Nerden Buldun?;' + `\`\`\`${nerdengeldin}\`\`\``, components: [row] }).catch(err => console.log(`Semoizm`)) 

}



let kanals = client.guilds.cache.get(modal.guildId).channels.cache.find(c => c.topic == modal.user.id)


  const isim2 = modal.getTextInputValue('textinput-customid')
  const yas2 = modal.getTextInputValue('textinput-customid2')

db.set(`semoizmdata_${modal.guild.id}.isim_${modal.user.id}`, isim2)
db.set(`semoizmdata_${modal.guild.id}.yas_${modal.user.id}`, yas2)

kanals.edit({
        parent: client.config.beklemedekatagoriid,
        topic: modal.user.id,
        permissionOverwrites: [{
            id: modal.user.id,
            deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: modal.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
        ],})
  }  
})


client.on("interactionCreate", async (interaction) => {



    if (!interaction.isButton()) return;
    if (interaction.customId == "kabulet") {
 

let adam1 = interaction.message.channel.topic
let adam = interaction.guild.members.cache.get(adam1)

let isim = db.fetch(`semoizmdata_${interaction.guild.id}.isim_${adam.id}`)
let yas = db.fetch(`semoizmdata_${interaction.guild.id}.yas_${adam.id}`)

 adam.setNickname(`${isim} '${yas}`).catch(err => console.log(`Semoizm`))
interaction.reply({content: 'Kullanıcı Başarıyla Onaylandı'}).catch(err => console.log(`Semoizm`))
adam.send(`**${interaction.guild.name}** Sunucusun'a yaptığınız başvuru onaylandı. İyi Günler! - Semoizm Dev`)
adam.roles.add(client.config.uyerol).catch(err => console.log(err))

let kanals23 = interaction.message.channel
setTimeout(async() => {
kanals23.delete().catch(err => console.log(`Semoizm`))
}, 3 * 1000)
}
if (interaction.customId == "reddet") {

let adam1 = interaction.message.channel.topic
let adam = interaction.guild.members.cache.get(adam1)
interaction.reply({content: 'Kullanıcı Başarıyla Red Edildi'}).catch(err => console.log(`Semoizm`))
adam.send(`**${interaction.guild.name}** Sunucusun'a yaptığınız başvuru red edildi. İyi Günler! - Semoizm Dev`)

let kanals23 = interaction.message.channel
setTimeout(async() => {
kanals23.delete().catch(err => console.log(`Semoizm`))
}, 3 * 1000)
} 
})


client.on("messageCreate", async msg => {
 if(msg.content == '!kayitmsg') {
  if(msg.author.id != client.config.sahip) return console.log(`${msg.author.tag}, tarafından yetkisiz deneme!`)
    const semoizmbuttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('kayitol')
            .setLabel('Kayit Ol')
            .setEmoji('👌')
            .setStyle('SUCCESS'),                   
    );

await msg.channel.send({content: 'Kayıt Mesajı', components: [semoizmbuttons]})
}
})

client.on("interactionCreate", async (interaction) => {

    if (!interaction.isButton()) return;
    if (interaction.customId == "kayitol") {
      if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {

let kanals = client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)
        
return interaction.reply({
          content: 'Zaten bir kayıt talebi oluşturdunuz!',
          ephemeral: true
        }); }
     
//oda olusturma

      interaction.guild.channels.create(`kayit-${interaction.user.username}`, {
        parent: client.config.kayitkatagoriid,
        topic: interaction.user.id,
        permissionOverwrites: [{
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
        ],
        type: 'text',
      }).then(async c => {
c.send(`<:ug_hypesquad:915989742141710366> **Sunucumuza hoşgeldin**! \n\n Kayıt olmak için \`/kayit\` komutunu kullanıp gerekli yerleri doldurmalısın! \n\n- <@${interaction.user.id}>`)
        interaction.reply({
          content: `Kanal Oluşturuldu! <#${c.id}>`,
          ephemeral: true
        });
        
})
 };
}) 

