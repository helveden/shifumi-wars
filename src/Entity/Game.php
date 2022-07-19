<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

use App\Utils\GameUtils;

/**
 * @ORM\Entity(repositoryClass=GameRepository::class)
 */
class Game
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     */
    private $mode;

    /**
     * @ORM\Column(type="integer")
     */
    private $type;

    /**
     * @ORM\Column(type="integer")
     */
    private $status;

    /**
     * @ORM\Column(type="smallint")
     */
    private $well_status;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $players = [];

    /**
     * @ORM\OneToMany(targetEntity=Round::class, mappedBy="game", orphanRemoval=true)
     */
    private $rounds;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="games")
     */
    private $user;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $players_info = [];

    /**
     * @ORM\Column(type="integer")
     */
    private $nbPlayers;

    public function __construct()
    {
        $this->rounds = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getMode(): ?int
    {
        return $this->mode;
    }

    public function setMode(int $mode): self
    {
        $this->mode = $mode;

        return $this;
    }

    public function getType(): ?int
    {
        return $this->type;
    }

    public function setType(int $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getWellStatus(): ?int
    {
        return $this->well_status;
    }

    public function setWellStatus(int $well_status): self
    {
        $this->well_status = $well_status;

        return $this;
    }

    public function getPlayers(): ?array
    {
        return $this->players;
    }

    public function setPlayers(?array $players): self
    {
        $this->players = $players;

        return $this;
    }

    /**
     * @return Collection<int, Round>
     */
    public function getRounds(): Collection
    {
        return $this->rounds;
    }

    public function addRound(Round $round): self
    {
        if (!$this->rounds->contains($round)) {
            $this->rounds[] = $round;
            $round->setGame($this);
        }

        return $this;
    }

    public function removeRound(Round $round): self
    {
        if ($this->rounds->removeElement($round)) {
            // set the owning side to null (unless already changed)
            if ($round->getGame() === $this) {
                $round->setGame(null);
            }
        }

        return $this;
    }

    public function getUser(): array
    {
        return $this->user->toArray();
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    } 

    public function toArray(bool $public = false): array
    {
        $output = [
            'id' => $this->id,
            'name' => $this->name,
            'players_info' => $this->players_info
        ];

        return $output;
    }

    public function getPlayersInfo(): ?array
    {
        return $this->players_info;
    }

    public function setPlayersInfo(?array $players_info): self
    {
        $this->players_info = $players_info;

        return $this;
    }

    public function getNbPlayers(): ?int
    {
        return $this->nbPlayers;
    }

    public function setNbPlayers(int $nbPlayers): self
    {
        $this->nbPlayers = $nbPlayers;

        return $this;
    }

    public static function getAllMode(): array
    {
        return GameUtils::ALL_MODE;
    }

    public static function getAllType(): array
    {
        return GameUtils::ALL_TYPE;
    }

    public static function getAllChoice(): array
    {
        return GameUtils::ALL_CHOICE;
    }
}
