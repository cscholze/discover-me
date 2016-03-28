#discover-me 
Discover Me is a multi-user network mapper web GUI built on Nmap. This project uses
an Angular front-end and is deployed via a local Node.js server.

## Setup
1. Open a terminal a clone this repo:
`git clone https://github.com/cscholze/discover-me.git'

2. Navigate into the cloned directory
`cd discover-me`

3. Install npm and bower dependencies
`npm install`

4. Start the Node.js server
`npm start`

5. Open a web browser and navigation to `localhost:3000`

6. Read getting started for instructions on using the app

## Getting Started
  Discover me is an web app used to demonstrate network device discovery thorough
  the use of a piece of software called Nmap. From their website, "Nmap ("Network
  Mapper") is a free and open source (<a ng-href="https://nmap.org/data/COPYING" target="_blank">license</a>)
  utility for network discovery and security auditing."

  This web app is a project to learn about network security and vulnerabilies.
  Because this app uses Nmap, it must first be installed on your machine.
  If you do  not already have Nmap installed, please navigate to the link
  below to install it. There are versions available for Windows, OSX, and
  Linux distributions. At this point in time, it has only been developed
  and tested for OSX.

  [Download Nmap](https://nmap.org/download.html)

  Once Nmap is installed, navigate to the Discovery page to begin discovering!</p>

## Discover
  Nmap discovers host by "ping-ing" every IP address on a subnetwork. Based on the
        response from the ping, Nmap discerns whether a device exists at that IP address
        and if it is open to communication over the network. Devices on a network send and receive
        signals through a port. From Wikipedia, "a port is an endpoint of communication
        in an operating system. While the term is also used for hardware devices, in software
        it is a logical construct that identifies a specific process or a type of service."
        If a device is able to communicate, it is considered "up"; if not, "down".

        Upon arriving at the discover page, you notice two buttons at the top. To begin
        discovering, click 'Discover Neighbors'.  This button will then execute Nmap on your
        local machine and return a list of IP adresses associate with any device it detected
        on your local network and display a card for each one.  While it does not include
        your machine, it will include items such as thermostats, printers, phones, and
        computers. If the software detects a device name, it will appear under the IP address
        on its respective card.

        Once Nmap finishes it creates a card for each host. The next step in discovery is to
        try and communicate with the device. While Nmap can perform very aggressive and in-depth
        network scans, this app only touches the surface using a less invasive scan technique.

        Click 'Scan Host' and Nmap will then perform a scan on the host. This scan sends TCP
        packet that tries to initiate a connection with each port. Based on the response, Nmap
        determines if the port is "open" or "closed". If a host is unresponsive, this app will
        display a message "HOST DOWN". If it does not detect and open ports, it will display
        "NO OPEN PORTS".  If a port is open and communicated, the card will populate with a list
        of ports, the communication protocol, and the service that is running.

        Finally, once you have scanned or rescanned one or more host(s), the save button will be
        enabled and allow you to save your scan results for all hosts you have scanned. They are
        saved and labeled by a timestamp and can be viewed on the 'View Scans' page.


## View Scans</h2>
 This view is where a user can view any scans that someone has performed and saved using
 this app. The view will load and populate with any scans currently stored in the database.
 If another user performs a scan and saves it, you must click 'Refresh Scans' to populate
 the list of scans. Click on a scan to view a dialog that contains the data saved.

In this view one can also delete scans from the database. Click the "Delete Scan" to engage
a 'delete mode' and display delete buttons. To delete, click on the trashcan icon next to a
a scan, or the scan button itself. A dialog opens allowing you to confirm the deletion or
cancel.

## Upcoming Features

## Known bugs
