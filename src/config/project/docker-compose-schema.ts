// Generated by ts-to-zod
import { z } from 'zod';

export const listOrDictSchema = z.union([
  z.record(z.union([z.string(), z.number(), z.boolean()]).nullable()),
  z.array(z.string()),
]);

export const definitionsGenericResourcesSchema = z.array(
  z.record(z.unknown()).and(
    z.object({
      discrete_resource_spec: z
        .record(z.unknown())
        .and(
          z.object({
            kind: z.string().optional(),
            value: z.number().optional(),
          })
        )
        .optional(),
    })
  )
);

export const listOfStringsSchema = z.array(z.string());

export const definitionsDevicesSchema = z.array(
  z.record(z.unknown()).and(
    z.object({
      capabilities: listOfStringsSchema.optional(),
      count: z.union([z.string(), z.number()]).optional(),
      device_ids: listOfStringsSchema.optional(),
      driver: z.string().optional(),
      options: listOrDictSchema.optional(),
    })
  )
);

export const deploymentSchema = z
  .record(z.unknown())
  .and(
    z.object({
      mode: z.string().optional(),
      endpoint_mode: z.string().optional(),
      replicas: z.number().optional(),
      labels: listOrDictSchema.optional(),
      rollback_config: z
        .record(z.unknown())
        .and(
          z.object({
            parallelism: z.number().optional(),
            delay: z.string().optional(),
            failure_action: z.string().optional(),
            monitor: z.string().optional(),
            max_failure_ratio: z.number().optional(),
            order: z
              .union([z.literal('start-first'), z.literal('stop-first')])
              .optional(),
          })
        )
        .optional(),
      update_config: z
        .record(z.unknown())
        .and(
          z.object({
            parallelism: z.number().optional(),
            delay: z.string().optional(),
            failure_action: z.string().optional(),
            monitor: z.string().optional(),
            max_failure_ratio: z.number().optional(),
            order: z
              .union([z.literal('start-first'), z.literal('stop-first')])
              .optional(),
          })
        )
        .optional(),
      resources: z
        .record(z.unknown())
        .and(
          z.object({
            limits: z
              .record(z.unknown())
              .and(
                z.object({
                  cpus: z.union([z.number(), z.string()]).optional(),
                  memory: z.string().optional(),
                  pids: z.number().optional(),
                })
              )
              .optional(),
            reservations: z
              .record(z.unknown())
              .and(
                z.object({
                  cpus: z.union([z.number(), z.string()]).optional(),
                  memory: z.string().optional(),
                  generic_resources: definitionsGenericResourcesSchema.optional(),
                  devices: definitionsDevicesSchema.optional(),
                })
              )
              .optional(),
          })
        )
        .optional(),
      restart_policy: z
        .record(z.unknown())
        .and(
          z.object({
            condition: z.string().optional(),
            delay: z.string().optional(),
            max_attempts: z.number().optional(),
            window: z.string().optional(),
          })
        )
        .optional(),
      placement: z
        .record(z.unknown())
        .and(
          z.object({
            constraints: z.array(z.string()).optional(),
            preferences: z
              .array(
                z.record(z.unknown()).and(
                  z.object({
                    spread: z.string().optional(),
                  })
                )
              )
              .optional(),
            max_replicas_per_node: z.number().optional(),
          })
        )
        .optional(),
    })
  )
  .nullable();

export const serviceConfigOrSecretSchema = z.array(
  z.union([
    z.string(),
    z.record(z.unknown()).and(
      z.object({
        source: z.string().optional(),
        target: z.string().optional(),
        uid: z.string().optional(),
        gid: z.string().optional(),
        mode: z.number().optional(),
      })
    ),
  ])
);

export const stringOrListSchema = z.union([z.string(), listOfStringsSchema]);

export const networkSchema = z
  .record(z.unknown())
  .and(
    z.object({
      name: z.string().optional(),
      driver: z.string().optional(),
      driver_opts: z.record(z.union([z.string(), z.number()])).optional(),
      ipam: z
        .record(z.unknown())
        .and(
          z.object({
            driver: z.string().optional(),
            config: z
              .array(
                z.record(z.unknown()).and(
                  z.object({
                    subnet: z.string().optional(),
                    ip_range: z.string().optional(),
                    gateway: z.string().optional(),
                    aux_addresses: z.record(z.string()).optional(),
                  })
                )
              )
              .optional(),
            options: z.record(z.string()).optional(),
          })
        )
        .optional(),
      external: z
        .union([
          z.boolean(),
          z.record(z.unknown()).and(
            z.object({
              name: z.string().optional(),
            })
          ),
        ])
        .optional(),
      internal: z.boolean().optional(),
      enable_ipv6: z.boolean().optional(),
      attachable: z.boolean().optional(),
      labels: listOrDictSchema.optional(),
    })
  )
  .nullable();

export const volumeSchema = z
  .record(z.unknown())
  .and(
    z.object({
      name: z.string().optional(),
      driver: z.string().optional(),
      driver_opts: z.record(z.union([z.string(), z.number()])).optional(),
      external: z
        .union([
          z.boolean(),
          z.record(z.unknown()).and(
            z.object({
              name: z.string().optional(),
            })
          ),
        ])
        .optional(),
      labels: listOrDictSchema.optional(),
    })
  )
  .nullable();

export const blkioLimitSchema = z.object({
  path: z.string().optional(),
  rate: z.union([z.number(), z.string()]).optional(),
});

export const blkioWeightSchema = z.object({
  path: z.string().optional(),
  weight: z.number().optional(),
});

export const definitionsHealthcheckSchema = z.record(z.unknown()).and(
  z.object({
    disable: z.boolean().optional(),
    interval: z.string().optional(),
    retries: z.number().optional(),
    test: z.union([z.string(), z.array(z.string())]).optional(),
    timeout: z.string().optional(),
    start_period: z.string().optional(),
  })
);

export const definitionsSecretSchema = z.record(z.unknown()).and(
  z.object({
    name: z.string().optional(),
    environment: z.string().optional(),
    file: z.string().optional(),
    external: z
      .union([
        z.boolean(),
        z.record(z.unknown()).and(
          z.object({
            name: z.string().optional(),
          })
        ),
      ])
      .optional(),
    labels: listOrDictSchema.optional(),
    driver: z.string().optional(),
    driver_opts: z.record(z.union([z.string(), z.number()])).optional(),
    template_driver: z.string().optional(),
  })
);

export const definitionsConfigSchema = z.record(z.unknown()).and(
  z.object({
    name: z.string().optional(),
    file: z.string().optional(),
    external: z
      .union([
        z.boolean(),
        z.record(z.unknown()).and(
          z.object({
            name: z.string().optional(),
          })
        ),
      ])
      .optional(),
    labels: listOrDictSchema.optional(),
    template_driver: z.string().optional(),
  })
);

export const definitionsDeploymentSchema = z
  .record(z.unknown())
  .and(
    z.object({
      mode: z.string().optional(),
      endpoint_mode: z.string().optional(),
      replicas: z.number().optional(),
      labels: listOrDictSchema.optional(),
      rollback_config: z
        .record(z.unknown())
        .and(
          z.object({
            parallelism: z.number().optional(),
            delay: z.string().optional(),
            failure_action: z.string().optional(),
            monitor: z.string().optional(),
            max_failure_ratio: z.number().optional(),
            order: z
              .union([z.literal('start-first'), z.literal('stop-first')])
              .optional(),
          })
        )
        .optional(),
      update_config: z
        .record(z.unknown())
        .and(
          z.object({
            parallelism: z.number().optional(),
            delay: z.string().optional(),
            failure_action: z.string().optional(),
            monitor: z.string().optional(),
            max_failure_ratio: z.number().optional(),
            order: z
              .union([z.literal('start-first'), z.literal('stop-first')])
              .optional(),
          })
        )
        .optional(),
      resources: z
        .record(z.unknown())
        .and(
          z.object({
            limits: z
              .record(z.unknown())
              .and(
                z.object({
                  cpus: z.union([z.number(), z.string()]).optional(),
                  memory: z.string().optional(),
                  pids: z.number().optional(),
                })
              )
              .optional(),
            reservations: z
              .record(z.unknown())
              .and(
                z.object({
                  cpus: z.union([z.number(), z.string()]).optional(),
                  memory: z.string().optional(),
                  generic_resources: definitionsGenericResourcesSchema.optional(),
                  devices: definitionsDevicesSchema.optional(),
                })
              )
              .optional(),
          })
        )
        .optional(),
      restart_policy: z
        .record(z.unknown())
        .and(
          z.object({
            condition: z.string().optional(),
            delay: z.string().optional(),
            max_attempts: z.number().optional(),
            window: z.string().optional(),
          })
        )
        .optional(),
      placement: z
        .record(z.unknown())
        .and(
          z.object({
            constraints: z.array(z.string()).optional(),
            preferences: z
              .array(
                z.record(z.unknown()).and(
                  z.object({
                    spread: z.string().optional(),
                  })
                )
              )
              .optional(),
            max_replicas_per_node: z.number().optional(),
          })
        )
        .optional(),
    })
  )
  .and(deploymentSchema);

export const definitionsNetworkSchema = z
  .record(z.unknown())
  .and(
    z.object({
      name: z.string().optional(),
      driver: z.string().optional(),
      driver_opts: z.record(z.union([z.string(), z.number()])).optional(),
      ipam: z
        .record(z.unknown())
        .and(
          z.object({
            driver: z.string().optional(),
            config: z
              .array(
                z.record(z.unknown()).and(
                  z.object({
                    subnet: z.string().optional(),
                    ip_range: z.string().optional(),
                    gateway: z.string().optional(),
                    aux_addresses: z.record(z.string()).optional(),
                  })
                )
              )
              .optional(),
            options: z.record(z.string()).optional(),
          })
        )
        .optional(),
      external: z
        .union([
          z.boolean(),
          z.record(z.unknown()).and(
            z.object({
              name: z.string().optional(),
            })
          ),
        ])
        .optional(),
      internal: z.boolean().optional(),
      enable_ipv6: z.boolean().optional(),
      attachable: z.boolean().optional(),
      labels: listOrDictSchema.optional(),
    })
  )
  .and(networkSchema);

export const definitionsVolumeSchema = z
  .record(z.unknown())
  .and(
    z.object({
      name: z.string().optional(),
      driver: z.string().optional(),
      driver_opts: z.record(z.union([z.string(), z.number()])).optional(),
      external: z
        .union([
          z.boolean(),
          z.record(z.unknown()).and(
            z.object({
              name: z.string().optional(),
            })
          ),
        ])
        .optional(),
      labels: listOrDictSchema.optional(),
    })
  )
  .and(volumeSchema);

export const definitionsServiceSchema = z.record(z.unknown()).and(
  z.object({
    deploy: definitionsDeploymentSchema.optional(),
    build: z
      .union([
        z.string(),
        z.record(z.unknown()).and(
          z.object({
            context: z.string().optional(),
            dockerfile: z.string().optional(),
            args: listOrDictSchema.optional(),
            ssh: listOrDictSchema.optional(),
            labels: listOrDictSchema.optional(),
            cache_from: z.array(z.string()).optional(),
            cache_to: z.array(z.string()).optional(),
            no_cache: z.boolean().optional(),
            network: z.string().optional(),
            pull: z.boolean().optional(),
            target: z.string().optional(),
            shm_size: z.union([z.number(), z.string()]).optional(),
            extra_hosts: listOrDictSchema.optional(),
            isolation: z.string().optional(),
            privileged: z.boolean().optional(),
            secrets: serviceConfigOrSecretSchema.optional(),
            tags: z.array(z.string()).optional(),
            platforms: z.array(z.string()).optional(),
          })
        ),
      ])
      .optional(),
    blkio_config: z
      .object({
        device_read_bps: z.array(blkioLimitSchema).optional(),
        device_read_iops: z.array(blkioLimitSchema).optional(),
        device_write_bps: z.array(blkioLimitSchema).optional(),
        device_write_iops: z.array(blkioLimitSchema).optional(),
        weight: z.number().optional(),
        weight_device: z.array(blkioWeightSchema).optional(),
      })
      .optional(),
    cap_add: z.array(z.string()).optional(),
    cap_drop: z.array(z.string()).optional(),
    cgroup: z.union([z.literal('host'), z.literal('private')]).optional(),
    cgroup_parent: z.string().optional(),
    command: z.union([z.string(), z.array(z.string())]).optional(),
    configs: serviceConfigOrSecretSchema.optional(),
    container_name: z.string().optional(),
    cpu_count: z.number().optional(),
    cpu_percent: z.number().optional(),
    cpu_shares: z.union([z.number(), z.string()]).optional(),
    cpu_quota: z.union([z.number(), z.string()]).optional(),
    cpu_period: z.union([z.number(), z.string()]).optional(),
    cpu_rt_period: z.union([z.number(), z.string()]).optional(),
    cpu_rt_runtime: z.union([z.number(), z.string()]).optional(),
    cpus: z.union([z.number(), z.string()]).optional(),
    cpuset: z.string().optional(),
    credential_spec: z
      .record(z.unknown())
      .and(
        z.object({
          config: z.string().optional(),
          file: z.string().optional(),
          registry: z.string().optional(),
        })
      )
      .optional(),
    depends_on: z
      .union([
        listOfStringsSchema,
        z.record(
          z.object({
            condition: z.union([
              z.literal('service_started'),
              z.literal('service_healthy'),
              z.literal('service_completed_successfully'),
            ]),
          })
        ),
      ])
      .optional(),
    device_cgroup_rules: listOfStringsSchema.optional(),
    devices: z.array(z.string()).optional(),
    dns: stringOrListSchema.optional(),
    dns_opt: z.array(z.string()).optional(),
    dns_search: stringOrListSchema.optional(),
    domainname: z.string().optional(),
    entrypoint: z.union([z.string(), z.array(z.string())]).optional(),
    env_file: stringOrListSchema.optional(),
    environment: listOrDictSchema.optional(),
    expose: z.array(z.union([z.string(), z.number()])).optional(),
    extends: z
      .union([
        z.string(),
        z.object({
          service: z.string(),
          file: z.string().optional(),
        }),
      ])
      .optional(),
    external_links: z.array(z.string()).optional(),
    extra_hosts: listOrDictSchema.optional(),
    group_add: z.array(z.union([z.string(), z.number()])).optional(),
    healthcheck: definitionsHealthcheckSchema.optional(),
    hostname: z.string().optional(),
    image: z.string().optional(),
    init: z.boolean().optional(),
    ipc: z.string().optional(),
    isolation: z.string().optional(),
    labels: listOrDictSchema.optional(),
    links: z.array(z.string()).optional(),
    logging: z
      .record(z.unknown())
      .and(
        z.object({
          driver: z.string().optional(),
          options: z
            .record(z.union([z.string(), z.number()]).nullable())
            .optional(),
        })
      )
      .optional(),
    mac_address: z.string().optional(),
    mem_limit: z.union([z.number(), z.string()]).optional(),
    mem_reservation: z.union([z.string(), z.number()]).optional(),
    mem_swappiness: z.number().optional(),
    memswap_limit: z.union([z.number(), z.string()]).optional(),
    network_mode: z.string().optional(),
    networks: z
      .union([
        listOfStringsSchema,
        z.record(
          z
            .record(z.unknown())
            .and(
              z.object({
                aliases: listOfStringsSchema.optional(),
                ipv4_address: z.string().optional(),
                ipv6_address: z.string().optional(),
                link_local_ips: listOfStringsSchema.optional(),
                priority: z.number().optional(),
              })
            )
            .nullable()
        ),
      ])
      .optional(),
    oom_kill_disable: z.boolean().optional(),
    oom_score_adj: z.number().optional(),
    pid: z
      .string()
      .optional()
      .nullable(),
    pids_limit: z.union([z.number(), z.string()]).optional(),
    platform: z.string().optional(),
    ports: z
      .array(
        z.union([
          z.number(),
          z.string(),
          z.record(z.unknown()).and(
            z.object({
              mode: z.string().optional(),
              host_ip: z.string().optional(),
              target: z.number().optional(),
              published: z.union([z.string(), z.number()]).optional(),
              protocol: z.string().optional(),
            })
          ),
        ])
      )
      .optional(),
    privileged: z.boolean().optional(),
    profiles: listOfStringsSchema.optional(),
    pull_policy: z
      .union([
        z.literal('always'),
        z.literal('never'),
        z.literal('if_not_present'),
        z.literal('build'),
        z.literal('missing'),
      ])
      .optional(),
    read_only: z.boolean().optional(),
    restart: z.string().optional(),
    runtime: z.string().optional(),
    scale: z.number().optional(),
    security_opt: z.array(z.string()).optional(),
    shm_size: z.union([z.number(), z.string()]).optional(),
    secrets: serviceConfigOrSecretSchema.optional(),
    sysctls: listOrDictSchema.optional(),
    stdin_open: z.boolean().optional(),
    stop_grace_period: z.string().optional(),
    stop_signal: z.string().optional(),
    storage_opt: z.record(z.unknown()).optional(),
    tmpfs: stringOrListSchema.optional(),
    tty: z.boolean().optional(),
    ulimits: z
      .record(
        z.union([
          z.number(),
          z.record(z.unknown()).and(
            z.object({
              hard: z.number(),
              soft: z.number(),
            })
          ),
        ])
      )
      .optional(),
    user: z.string().optional(),
    uts: z.string().optional(),
    userns_mode: z.string().optional(),
    volumes: z
      .array(
        z.union([
          z.string(),
          z.record(z.unknown()).and(
            z.object({
              type: z.string(),
              source: z.string().optional(),
              target: z.string().optional(),
              read_only: z.boolean().optional(),
              consistency: z.string().optional(),
              bind: z
                .record(z.unknown())
                .and(
                  z.object({
                    propagation: z.string().optional(),
                    create_host_path: z.boolean().optional(),
                    selinux: z
                      .union([z.literal('z'), z.literal('Z')])
                      .optional(),
                  })
                )
                .optional(),
              volume: z
                .record(z.unknown())
                .and(
                  z.object({
                    nocopy: z.boolean().optional(),
                  })
                )
                .optional(),
              tmpfs: z
                .record(z.unknown())
                .and(
                  z.object({
                    size: z.union([z.number(), z.string()]).optional(),
                    mode: z.number().optional(),
                  })
                )
                .optional(),
            })
          ),
        ])
      )
      .optional(),
    volumes_from: z.array(z.string()).optional(),
    working_dir: z.string().optional(),
  })
);

export const propertiesNetworksSchema = z.record(definitionsNetworkSchema);

export const propertiesVolumesSchema = z.record(definitionsVolumeSchema);

export const propertiesSecretsSchema = z.record(definitionsSecretSchema);

export const propertiesConfigsSchema = z.record(definitionsConfigSchema);

export const propertiesServicesSchema = z.record(definitionsServiceSchema);

export const composeSpecificationSchema = z.record(z.unknown()).and(
  z.object({
    version: z.string().optional(),
    name: z.string().optional(),
    services: propertiesServicesSchema.optional(),
    networks: propertiesNetworksSchema.optional(),
    volumes: propertiesVolumesSchema.optional(),
    secrets: propertiesSecretsSchema.optional(),
    configs: propertiesConfigsSchema.optional(),
  })
);
