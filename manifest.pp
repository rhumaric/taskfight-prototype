# --------------------------------------------------------------------------
# Puppet manifest for wordpress projects:
# - Creates a host entry
# - Configures a vhost on an Apache server
# - Creates a database with a specific user
#
# The manifest relies on Hiera to access server specific information like
# the folder where the project is deployed or the database password.
#
# Apache configuration uses a fork of puppetlabs-apache module, available at
# https://github.com/rhumaric/puppetlabs-apache
#
# Author: Romaric Pascal (rhumaric)
# License: MIT
# --------------------------------------------------------------------------

# Wrapper to encapsulate the whole application configuration. This is mainly
# to give Hiera an `application_name` variable, which I use to structure
# my database:
#
# - my-app.yaml : app specific values (eg. mysql user and password, host name, docroot...)
# - common.yaml : server wide values (eg. mysql root password)
#
class application($application_name){

# --------------------------------------------------------------------------
# Host entry
# --------------------------------------------------------------------------

  # On staging and production environment, this is handled by having
  # a new entry in the DNS server. Only in 'local' environments does the project
  # need a host entry.
  if($environment == 'local') {

    host { '${application_name}':
      ensure => 'present',

      # This allows  
      name => hiera('hostname'),
      ip => '127.0.0.1'
    }
  }

# --------------------------------------------------------------------------
# Apache configuration
# --------------------------------------------------------------------------
  
  # Makes sure apache is installed on the system. Leaves any vhost already
  # deployed as it is.
  class { 'apache':
    purge_vhosts_dir => false
  }

  # Creates the vhost, passing along the necessary mysql information
  apache::vhost{ '${application_name}':
    name => "${application_name}.${::environment}",
    port => 80,
    docroot => hiera('docroot'),
    configure_firewall => false,
    servername => hiera('hostname'),
    ssl => false,
    override => all
  }
}

# Creates the application
class {'application':
  application_name => 'taskfight'
}