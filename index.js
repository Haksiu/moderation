const Discord = require("discord.js");
var Client = new Discord.Client();
const ms = require("ms");
const fs = require("fs");
let warns = require("./warnings.json")
const config = require("./config.json");
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
let WelcomeM = JSON.parse(fs.readFileSync('./Welcomemessages.json', 'utf8'));



Client.on("ready", async () => {
    console.log(`${Client.user.username} is online on ${Client.guilds.size} servers!`);


     Client.user.setActivity("Discord Hack Week", {type: "WATCHING"});
	  Client.user.setStatus("dnd");


});
this.settings = new Enmap({ provider: new EnmapLevel({ name: 'settings' }) });



Client.on("message", async message => {
  
    if(!message.guild) return;
    if (message.author.bot) return;
    
    
    
    let mention = message.member;
    var msgContent = message.content.toLowerCase();

    if(msgContent.includes("@everyone") || msgContent.includes("@here"))
  {
    if (message.guild != null) message.delete();
    message.reply("For the server's safety, I cannot mention everyone. My apologies.");
    return;
  }
if(!message.content.startsWith(config.prefix)) return;

let cmd = message.content.split(" ")[0];
 cmd = cmd.slice(config.prefix.length);

 let args = message.content.split(" ").slice(1);


 if(cmd === "warn") {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You don't have permission")

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("User not found")
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't warn this user!")
    let reason = args.join(" ").slice(22);
if(!reason) reason = "No reason"
if(!warns[wUser.id]) warns[wUser.id] = {


    warns: 0

};

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns));

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Warned User", `<@${wUser.id}>`)
  .addField("Warned In", message.channel)
  .addField("Number of warnings", warns[wUser.id].warns)
  .addField("Reason", reason);


  let warnchannel = message.guild.channels.find("name", "log")
  if(!warnchannel) return message.reply("Log channel not found")

  warnchannel.send(warnEmbed);

}



if (cmd === "ban")
  {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You don't have permission")


 let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if(!bUser) return message.channel.send("User not found");
  let bReason = args.join(" ").slice(22);
    if(!bReason) bReason = "No reason"
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't ban this user :)");



  let banEmbed = new Discord.RichEmbed()
  .setDescription("~Ban~")
  .setColor("#bc0000")
  .addField("Banned User", `${bUser} ID ${bUser.id}`)
  .addField("Banned in", `${message.author} ID ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", bReason);

  let banChannel = message.guild.channels.find(`name`, "log")

   if (!banChannel) return message.channel.send("Log channel not found");



 message.guild.member(bUser).ban(bReason);
 banChannel.send(banEmbed);




  }


  	if (cmd === "kick")
  {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You don't have permission")


 let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if(!kUser) return message.channel.send("User not found");
  let kReason = args.join(" ").slice(22);
  if(!kReason) kReason = "no reason"
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't kick this user");



  let kickEmbed = new Discord.RichEmbed()
  .setDescription("~Kick~")
  .setColor("e56b00")
  .addField("Kick'ed User", `${kUser} ID ${kUser.id}`)
  .addField("Kick'ed in", `${message.author} ID ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason);

  let kickChannel = message.guild.channels.find(`name`, "log")

   if (!kickChannel) return message.channel.send(":x: Log channel not found");



 message.guild.member(kUser).kick(kReason);
 kickChannel.send(kickEmbed);




  }


  if(cmd === "purge") {

    const deleteCount = parseInt(args[0], 10);
if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No no no.");


if(!deleteCount || deleteCount < 2 || deleteCount > 100)
 return message.reply("Please provide a number between 2 and 100 for the number of messages to delete.");

const fetched = await message.channel.fetchMessages({limit: deleteCount});
message.channel.bulkDelete(fetched)
 .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

let purgeEmbed = new Discord.RichEmbed()
.setAuthor("♻️ Action | Purge")
.setColor("RANDOM")
.addField("Executor", `<@${message.author.id}>`)
.addField("Purge", `${args[0]}`)
.addField("Deleted", `${args[0]}`)
.setFooter("Bot Version 1.0.0", Client.user.displayAvatarURL);

let purgeChannel = message.guild.channels.find(`name`, "log");
if(!purgeChannel) return message.channel.send("Can't find log channel.");

purgeChannel.send(purgeEmbed);


         }

         if(cmd === "reboot") {

            if (message.author.id === "308339858571526154") {
          message.channel.send(":gear: Reload in process")
        
         Client.destroy()
          Client.login(config.token)
        message.channel.send(":gear: Reload has been done")
        } else {
        
        message.channel.send("Only the Owner of this bot can do that !")
        
          }
        
        
        }
        
        
        if(cmd === "lockdown") {
            if (!message.guild.member(message.author).hasPermission("MANAGE_SERVER")) return message.channel.send("Sorry sir you are not an Administrator so you can't use this command. Administrators are the people who possess the `Manage_Server` permission.")
          if (!Client.lockit) Client.lockit = [];
          let time  = args.join(" ");
          let validUnlocks = ["release", "unlock" , "rel" , "ul"];
          const perms = message.member.hasPermission("MANAGE_MESSAGES");
         if (!perms) return message.channel.send("Sorry sir, you must have **Manage_Messages** permission.")
          if (!time) return message.channel.send("You must set a duration for the lockdown in either hours, minutes or seconds.");
        
            if (message.author.id === config.ownerid) {
        message.channel.overwritePermissions(message.author, {
          SEND_MESSAGES: true
        })}
        
          if (validUnlocks.includes(time)) {
            message.channel.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: null
            }).then(() => {
              message.channel.send("Lockdown lifted.");
              clearTimeout(Client.lockit[message.channel.id]);
              delete Client.lockit[message.channel.id];
            }).catch(error => {
              console.log(error);
            });
          } else {
            message.channel.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: false
            }).then(() => {
              message.channel.send(`Channel locked down for ${ms(ms(time), { long:true })}`).then(() => {
        
                Client.lockit[message.channel.id] = setTimeout(() => {
                  message.channel.overwritePermissions(message.guild.id, {
                    SEND_MESSAGES: null
                  }).then(message.channel.send("Lockdown lifted.")).catch(console.error);
                  delete Client.lockit[message.channel.id];
                }, ms(time));
        
              }).catch(error => {
                console.log(error);
              });
            });
          }
        }
  if(cmd === "report") {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) return message.channel.send(":x:" + " ***I couldn't find this user***f").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	let reason = args.join(" ").slice(22);
	if(!reason) return message.channel.send(":x:" + " ***Please specify a reason***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
		
	let reportEmbed = new Discord.RichEmbed()
	.setDescription("Reports")
	.setColor(`#ffff00`)
	.addField("Reported User", `${rUser} with ID: ${rUser.id}`)
	.addField("Reported By", `${message.author} with ID: ${message.author.id}`)
	.addField("Channel", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", reason);
	
	let reportschannel = message.guild.channels.find(`name`, "log");
	if(!reportschannel) return message.channel.send(":x:" + " ***Couldn't find reports channel.***");
	reportschannel.send(reportEmbed);
	message.channel.send(":white_check_mark: ***" + `${rUser}` + "*** ***has been reported***").then(m => {
		message.delete().catch(O_o=>{});
	});
  }
  if(cmd === "tmute") {
    if(message.guild === null)return;

  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them please get the manage_messages perm!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


//end of module
}
if (cmd === "ar") {
  if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("Sorry, you do not have permission to perform the antiraid command.");
  if (!message.guild.member(Client.user).hasPermission('BAN_MEMBERS')) return message.reply('Sorry, i dont have the perms to do this cmd i need BAN_MEMBERS. :x:').catch(console.error);
  const ms = require('ms');
  if (!Client.lockit) Client.lockit = [];
  const time = args.join(' ');
  const validUnlocks = ['release', 'unlock'];
  if (!time) return message.reply('You must set a duration for the lockdown in either hours, minutes or seconds');

  if (validUnlocks.includes(time)) {
      message.channel.overwritePermissions(message.guild.id, {
          SEND_MESSAGES: null
      }).then(() => {
          message.channel.send('Lockdown lifted.');
          clearTimeout(Client.lockit[message.channel.id]);
          delete Client.lockit[message.channel.id];
      }).catch(error => {
          console.log(error);
      });
  } 
else {
  message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
  }).then(() => {
      message.channel.send(`Channel locked down for ${ms(ms(time), { long:true })}`).then(() => {

          Client.lockit[message.channel.id] = setTimeout(() => {
              message.channel.overwritePermissions(message.guild.id, {
                  SEND_MESSAGES: null
              }).then(message.channel.send('Lockdown lifted.')).catch(console.error);
              delete Client.lockit[message.channel.id];
          }, ms(time));

      }).catch(error => {
          console.log(error);
      });
  });
}
}

if (cmd === "hackban") {
  if (message.member.hasPermission("BAN_MEMBERS")) {
      if (!message.guild.member(Client.user).hasPermission('BAN_MEMBERS')) return message.reply('Sorry, i dont have the perms to do this cmd i need BAN_MEMBERS. :x:').catch(console.error);
      const usage = new Discord.RichEmbed()
          .setColor(0x738BD7)
          .setThumbnail(Client.user.avatarURL)
          .addField("Usage: ", ";hackban <userid> <reason>")
          .addField("Example: ", ";hackban 330044809651814412 self bot that dms add links");
      let user = args.slice(0).join(' ');
      let reason = args.slice(1).join(' ') || `Moderator didn't give a reason.`;
      if (reason.length < 1) return message.channel.send(usage).catch(console.error);
      if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
      let guild = message.member.guild;
      if (user.length < 1) return message.channel.send("need to provide a valid user id to ban them");
      //if (!Setlogmaster[message.guild.id]) Setlogmaster[message.guild.id] = {Logchannel : "logs"}
      let modlog = message.guild.channels.find('name', "log");
      message.guild.ban(user, 2);
      const embed = new Discord.RichEmbed()
          .setColor(0x738BD7)
          //.setDescription("Case: " + caseNum + "Action: ")
          .addField('Moderated User:', `ID: ` + user)
          .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
          .addField('Actions Taken:', 'Hack Ban')
          .addField('Reason Given:', "Moderator didn't give a reason.");
      message.channel.send("ID: " + user + ", has been banned from the server.")
      if (!modlog) return;
      Client.channels.get(modlog.id).send({
          embed
      });
  }
}

if(cmd === "addrole") {
  if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");

        if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return errors.noPerms(message, "MANAGE_ROLES");
        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return errors.lack(message.channel, "MANAGE_ROLES");

        let cmd = message.content.split(" ")[0]; //used because of command aliases
        if (args[0] == "help") return message.channel.send(`Command Syntax: ${cmd} (user) <role-name>`);

        let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0]);
        if(!rMember) return errors.cantfindUser(message.channel);

        if (rMember.id === Client.user.id) return errors.botuser(message, "add a role to");

        let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first();
        if(!role) return errors.noRole(message.channel);

        if(rMember.roles.has(role.id)) {
            return message.channel.send(`**${rMember.displayName} already has that role!**`)
        } else {
            try {
                await rMember.addRole(role.id);
                message.channel.send(`**The role, ${role.name}, has been added to ${rMember.displayName}.**`); //if successful this message
            } catch(e) {
                let id = second.getError(e.message);
                message.channel.send(`Unfortunately an error occurred. Error ID: ${id}`);
            }
        }
    }

if(cmd === "remrole") {
  if (message.channel.type == "dm") return message.channel.send("This command only works in a server!");
        if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return errors.noPerms(message, "MANAGE_ROLES");
        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return errors.lack(message.channel, "MANAGE_ROLES");

        let cmd = message.content.split(" ")[0]; //because command aliases
        if(args[0] == "help") return message.channel.send(`Command Syntax: ${cmd} (user) <role-name>`);

        let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0]);
        if(!rMember) return errors.cantfindUser(message.channel);

        if (rMember.id === Client.user.id) return errors.botuser(message, "remove a role from");

        let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first();
        if(!role) return errors.noRole(message.channel);

        if(!rMember.roles.has(role.id)) { //if user does not have specified role
            return message.channel.send(`**${rMember.displayName} does not have that role to begin with!**`);
        } else {
            await rMember.removeRole(role.id); //remove role
            message.channel.send(`**The role ${role.name} has been successfully removed from ${rMember.displayName}.**`);
        }
    }

 
        });
        Client.login(config.token)
